/**
 * Static content reveal — the classes pages use, and the fallback that drives
 * them where scroll-driven CSS animation does not exist.
 *
 * The motion itself is CSS. See site/src/styles/index.css for the keyframes and
 * for why the two mechanisms are shaped the way they are.
 */

/**
 * Direction is chosen per element. Copy enters from the left and imagery from
 * the right in two-column blocks, so a row assembles from its edges inward;
 * everything else rises. `still` opts an element out of a group it sits in.
 *
 * `left` and `right` carry the base class too, so the same constant works
 * whether the element opted in on its own or is a child of a group.
 */
export const REVEAL = {
  up: 'm42-in',
  left: 'm42-in m42-in-left',
  right: 'm42-in m42-in-right',
  still: 'm42-in-still',
}

/**
 * Marks a container whose direct children animate in sequence. Keyed by the
 * direction those children travel, so a column of cards can arrive from the
 * side while the page's ordinary content rises.
 */
export const REVEAL_GROUP = {
  up: 'm42-in-group',
  left: 'm42-in-group m42-in-group-left',
  right: 'm42-in-group m42-in-group-right',
}

/* Asked at call time, not at module load. A value captured on import would be
   fixed before anything could observe it, which makes the branch untestable and
   pins the answer to whenever the module happened to be evaluated. */
const supportsScrollTimeline = () =>
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('animation-timeline', 'view()')

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const REVEALED = 'is-in'
const SELECTOR = `.m42-in:not(.${REVEALED}), .${REVEAL_GROUP.up} > *:not(.${REVEALED})`

/**
 * The margin pulls the trigger line up from the bottom edge so an element is
 * already a little way into the viewport before it starts, matching where the
 * scrubbed path begins. Without it the motion starts at the very edge and the
 * first frames happen where they cannot be seen.
 */
const ROOT_MARGIN = '0px 0px -12% 0px'

let observer = null

function reveal(element) {
  element.classList.add(REVEALED)
  observer.unobserve(element)
}

/**
 * Observes anything not yet revealed. Safe to call repeatedly: elements already
 * carrying the revealed class are excluded by the selector, and re-observing an
 * element the observer already holds is a no-op.
 *
 * Call it after each navigation. This is a single-page app, so a route change
 * replaces the content without reloading the document, and the new content has
 * never been seen by the observer.
 */
export function scanForReveal() {
  if (!observer) return
  document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el))
}

/**
 * Starts the fallback, and returns whether it took ownership.
 *
 * Nothing is hidden until this succeeds, because the marker attribute is what
 * activates the hidden start state in CSS and it is set here. An environment
 * without IntersectionObserver, or a reader who has asked for reduced motion,
 * leaves the document unmarked and therefore fully visible.
 */
export function startRevealFallback() {
  if (supportsScrollTimeline()) return false
  if (typeof IntersectionObserver === 'undefined') return false
  if (prefersReducedMotion()) return false
  if (observer) return true

  observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && reveal(e.target)),
    { rootMargin: ROOT_MARGIN },
  )

  document.documentElement.dataset.reveal = 'js'
  scanForReveal()
  return true
}
