/* The site's absolute identity, and the paths of the assets a social crawler
   or a browser asks for by name.

   index.html is static markup and cannot import any of this, so it carries the
   literals and social-metadata.test.jsx holds the two together. This module is
   the single source those assertions compare against, and the source the
   generator stamps into its manifest.

   The origin matters more here than anywhere else on the site: og:url and
   og:image are the only absolute URLs the site publishes, and a crawler that
   cannot resolve them shows a bare link. */
export const SITE_ORIGIN = 'https://www.mile42.ai'

export const SHARE_IMAGE = '/share-card.png'
export const SHARE_IMAGE_WIDTH = 1200
export const SHARE_IMAGE_HEIGHT = 630

export const ICON_SVG = '/icon.svg'
export const ICON_PNG = '/icon-32.png'
export const APPLE_TOUCH_ICON = '/apple-touch-icon.png'
export const APPLE_TOUCH_ICON_SIZE = 180

export const absolute = (path) => `${SITE_ORIGIN}${path}`
