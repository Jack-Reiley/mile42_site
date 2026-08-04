# Mile42 copy prototype

A Vite + React recreation of the mid-fidelity copy prototype at
<https://glittery-smakager-8dbb5a.netlify.app>. All 16 pages, their copy, and the
prototype's stylesheet were ported over as-is. This is a copy and structure
reference, not the designed site.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Layout

| Path                        | What's in it                                                     |
| --------------------------- | ---------------------------------------------------------------- |
| `src/App.jsx`               | Route table — path, `<title>`, and page component for all 16 pages |
| `src/components/Layout.jsx` | Prototype banner, header, footer, per-page title, scroll reset    |
| `src/components/Lists.jsx`  | The four recurring `.nums` / statement-card list shapes           |
| `src/pages/`                | One component per page                                            |
| `src/styles/base.css`       | The prototype's stylesheet, ported verbatim                       |

## Notes on fidelity

Two quirks were carried over from the prototype rather than fixed, so this stays
a faithful copy:

- The banner paragraph uses `class="proto-banner"` while the stylesheet defines
  `.proto`, so it renders unstyled — same as the original.
- `.card { display: flex }` is an author rule and so outranks the user agent's
  `[hidden] { display: none }`. On the live prototype this leaves the contact
  form and its "Thanks. We have it." panel visible at the same time. A
  `.card[hidden]` rule at the end of `base.css` fixes it here — the one
  deliberate departure from the original.

Routing is client-side, so `public/_redirects` rewrites all paths to
`index.html`. Astro's scoped `[data-astro-cid-*]` attribute selectors in the CSS
were reduced to the plain selectors they targeted.
