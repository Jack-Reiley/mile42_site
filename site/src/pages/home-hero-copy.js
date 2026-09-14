/* The homepage hero's words, lifted out of Home.jsx so the share-card
   generator can draw the same strings the page shows.

   `site/scripts/social-assets.mjs` runs under Node and cannot import JSX,
   which is why this is a plain module rather than constants inside the page.
   The generator records what it drew, and social-metadata.test.jsx compares
   that record back to this file: editing the hero without regenerating the
   card fails the suite instead of shipping a card that quotes copy the site
   no longer uses.

   The kicker is no longer drawn in the hero. It stays here because it is the
   document title in App.jsx and the first line of the share card, and the
   suite holds those two to this string. */
export const HOME_HERO = {
  kicker: 'Execution, Rebuilt.',
  heading: 'Most AI pilots never make it past the demo.',
  lead:
    'Almost every organization has run one. It demonstrated well, leadership was ' +
    'encouraged, and nothing changed. Mile42 exists for what comes next: ' +
    'getting agents into real workflows, past security review, and into daily use.',
}
