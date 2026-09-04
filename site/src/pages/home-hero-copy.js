/* The homepage hero's words, lifted out of Home.jsx so the share-card
   generator can draw the same strings the page shows.

   `site/scripts/social-assets.mjs` runs under Node and cannot import JSX,
   which is why this is a plain module rather than constants inside the page.
   The generator records what it drew, and social-metadata.test.jsx compares
   that record back to this file: editing the hero without regenerating the
   card fails the suite instead of shipping a card that quotes copy the site
   no longer uses. */
export const HOME_HERO = {
  kicker: 'Execution, Rebuilt.',
  heading: 'The consulting model is broken. We didn’t bring it with us.',
  lead:
    'Mile42 combines senior judgment with AI-native delivery, without bloated teams, ' +
    'endless billing, or recommendations that never become results.',
}
