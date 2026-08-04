#!/usr/bin/env bash

SOFTWARE_DELIVERY_CONFIG="${SOFTWARE_DELIVERY_CONFIG:-.agents/software-delivery.config.json}"

if [[ ! -f "$SOFTWARE_DELIVERY_CONFIG" ]]; then
  echo "Missing software-delivery config: $SOFTWARE_DELIVERY_CONFIG" >&2
  return 1 2>/dev/null || exit 1
fi

SD_PROJECT_OWNER=$(jq -r '.project.owner' "$SOFTWARE_DELIVERY_CONFIG")
SD_PROJECT_NUMBER=$(jq -r '.project.number' "$SOFTWARE_DELIVERY_CONFIG")
SD_PROJECT_ID=$(jq -r '.project.id' "$SOFTWARE_DELIVERY_CONFIG")
SD_STATUS_FIELD_ID=$(jq -r '.fields.status.id' "$SOFTWARE_DELIVERY_CONFIG")
SD_SIZE_FIELD_ID=$(jq -r '.fields.size.id' "$SOFTWARE_DELIVERY_CONFIG")
SD_ESTIMATE_FIELD_ID=$(jq -r '.fields.estimate.id' "$SOFTWARE_DELIVERY_CONFIG")

SD_REMOTE=$(git config --get remote.origin.url 2>/dev/null)
SD_REMOTE=${SD_REMOTE%.git}
SD_REPO_NAME=${SD_REMOTE##*/}
SD_REPO_OWNER=$(printf '%s' "$SD_REMOTE" | sed -E 's#.*[/:]([^/]+)/[^/]+$#\1#')

sd_status_name() {
  jq -r --arg key "$1" '.statuses[$key].name // empty' "$SOFTWARE_DELIVERY_CONFIG"
}

sd_status_option_id() {
  jq -r --arg key "$1" '.statuses[$key].id // empty' "$SOFTWARE_DELIVERY_CONFIG"
}

sd_size_option_id() {
  jq -r --arg key "$1" '.fields.size.options[$key] // empty' "$SOFTWARE_DELIVERY_CONFIG"
}

ticket_snapshot() {
  local issue_num=$1
  gh api graphql -f query='
    query($owner:String!,$name:String!,$num:Int!){
      repository(owner:$owner,name:$name){ issue(number:$num){
        number
        labels(first:50){ nodes{ name } }
        parent{ number }
        projectItems(first:20){ nodes{
          id
          project{ number }
          status: fieldValueByName(name:"Status"){
            ... on ProjectV2ItemFieldSingleSelectValue { name }
          }
          size: fieldValueByName(name:"Size"){
            ... on ProjectV2ItemFieldSingleSelectValue { name }
          }
          estimate: fieldValueByName(name:"Estimate"){
            ... on ProjectV2ItemFieldNumberValue { number }
          }
        }}
      }}
    }' \
    -F owner="$SD_REPO_OWNER" \
    -F name="$SD_REPO_NAME" \
    -F num="$issue_num" \
    --jq "{
      number: .data.repository.issue.number,
      labels: [.data.repository.issue.labels.nodes[].name],
      parent: (.data.repository.issue.parent.number // null),
      item: ([
        .data.repository.issue.projectItems.nodes[]
        | select(.project.number == $SD_PROJECT_NUMBER)
      ] | first // null)
    }"
}

get_status() {
  ticket_snapshot "$1" | jq -r '.item.status.name // empty'
}

get_type() {
  ticket_snapshot "$1" \
    | jq -r 'first(.labels[] | select(. == "epic" or . == "story" or . == "bug")) // ""'
}

has_label() {
  ticket_snapshot "$1" \
    | jq -e --arg label "$2" '.labels | index($label) != null' >/dev/null
}

sd_item_id() {
  ticket_snapshot "$1" | jq -r '.item.id // empty'
}

require_status() {
  local issue_num=$1
  local semantic_status=$2
  local expected actual
  expected=$(sd_status_name "$semantic_status")
  actual=$(get_status "$issue_num")
  if [[ -z "$expected" || "$actual" != "$expected" ]]; then
    echo "Ticket #$issue_num is in '$actual'; expected '$expected'." >&2
    return 1
  fi
}

move_ticket() {
  local issue_num=$1
  local semantic_status=$2
  local item_id option_id expected actual
  item_id=$(sd_item_id "$issue_num")
  option_id=$(sd_status_option_id "$semantic_status")
  expected=$(sd_status_name "$semantic_status")
  if [[ -z "$item_id" || -z "$option_id" || -z "$expected" ]]; then
    echo "Cannot resolve project item or status '$semantic_status'." >&2
    return 1
  fi
  gh project item-edit \
    --id "$item_id" \
    --project-id "$SD_PROJECT_ID" \
    --field-id "$SD_STATUS_FIELD_ID" \
    --single-select-option-id "$option_id" >/dev/null
  actual=$(get_status "$issue_num")
  if [[ "$actual" != "$expected" ]]; then
    echo "Board move verification failed for #$issue_num: '$actual'." >&2
    return 1
  fi
}

add_issue_to_project() {
  local issue_url=$1
  local issue_num=${issue_url##*/}
  if [[ -n "$(sd_item_id "$issue_num")" ]]; then
    return 0
  fi
  gh project item-add "$SD_PROJECT_NUMBER" \
    --owner "$SD_PROJECT_OWNER" \
    --url "$issue_url" >/dev/null
  if [[ -z "$(sd_item_id "$issue_num")" ]]; then
    echo "Project add verification failed for #$issue_num." >&2
    return 1
  fi
}

set_size() {
  local issue_num=$1
  local size=$2
  local item_id option_id actual
  item_id=$(sd_item_id "$issue_num")
  option_id=$(sd_size_option_id "$size")
  if [[ -z "$item_id" || -z "$option_id" ]]; then
    echo "Cannot resolve Size '$size' for #$issue_num." >&2
    return 1
  fi
  gh project item-edit \
    --id "$item_id" \
    --project-id "$SD_PROJECT_ID" \
    --field-id "$SD_SIZE_FIELD_ID" \
    --single-select-option-id "$option_id" >/dev/null
  actual=$(ticket_snapshot "$issue_num" | jq -r '.item.size.name // empty')
  if [[ "$actual" != "$size" ]]; then
    echo "Size verification failed for #$issue_num: '$actual'." >&2
    return 1
  fi
}

set_estimate() {
  local issue_num=$1
  local points=$2
  local item_id
  case "$points" in
    1|2|3|5|8|13|21) ;;
    *)
      echo "Estimate must be a Fibonacci value: 1,2,3,5,8,13,21." >&2
      return 1
      ;;
  esac
  item_id=$(sd_item_id "$issue_num")
  if [[ -z "$item_id" ]]; then
    echo "Cannot resolve project item for #$issue_num." >&2
    return 1
  fi
  gh project item-edit \
    --id "$item_id" \
    --project-id "$SD_PROJECT_ID" \
    --field-id "$SD_ESTIMATE_FIELD_ID" \
    --number "$points" >/dev/null
  if ! ticket_snapshot "$issue_num" \
    | jq -e --argjson points "$points" '.item.estimate.number == $points' >/dev/null; then
    echo "Estimate verification failed for #$issue_num." >&2
    return 1
  fi
}

sd_issue_node_id() {
  gh api graphql -f query='
    query($owner:String!,$name:String!,$num:Int!){
      repository(owner:$owner,name:$name){ issue(number:$num){ id } }
    }' \
    -F owner="$SD_REPO_OWNER" \
    -F name="$SD_REPO_NAME" \
    -F num="$1" \
    --jq '.data.repository.issue.id'
}

set_parent_issue() {
  local child_num=$1
  local parent_num=$2
  local child_id parent_id
  if [[ "$(ticket_snapshot "$child_num" | jq -r '.parent // empty')" == "$parent_num" ]]; then
    return 0
  fi
  child_id=$(sd_issue_node_id "$child_num")
  parent_id=$(sd_issue_node_id "$parent_num")
  if [[ -z "$child_id" || -z "$parent_id" ]]; then
    echo "Cannot resolve parent/child node IDs." >&2
    return 1
  fi
  gh api graphql -f query='
    mutation($parent:ID!,$child:ID!){
      addSubIssue(input:{issueId:$parent,subIssueId:$child}){
        issue{ number }
      }
    }' \
    -F parent="$parent_id" \
    -F child="$child_id" >/dev/null
  if [[ "$(ticket_snapshot "$child_num" | jq -r '.parent // empty')" != "$parent_num" ]]; then
    echo "Parent verification failed for #$child_num." >&2
    return 1
  fi
}

claim_ticket() {
  local issue_num=$1
  local login
  login=$(gh api user --jq '.login')
  gh issue edit "$issue_num" --add-assignee "@me" >/dev/null
  if ! gh issue view "$issue_num" --json assignees \
    --jq '.assignees[].login' | rg -Fxq "$login"; then
    echo "Assignee verification failed for #$issue_num." >&2
    return 1
  fi
}
