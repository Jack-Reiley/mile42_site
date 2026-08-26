import logo from '../assets/mile42-logo-light.svg'

/* The only public page until launch. The designed site is served under
   /working and nothing here links to it. */
/* The lockup carries the page's only heading, so it stays inside an `h1` with
   the mark's name as its alt text rather than replacing the heading with a
   bare image. The width holds the mark's lettering at roughly the 57px the H1
   token set before the logo landed, and steps down on a phone.

   Both axes are set, and to whole pixels: the asset is an exact 2:1, and a
   fractional box puts the mark's hairline ring off the device pixel grid and
   renders it as a soft grey line rather than a solid one. */
export default function ComingSoon() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-brand px-6 text-center">
      <h1>
        <img
          src={logo}
          alt="Mile42"
          width="256"
          height="128"
          className="block h-28 w-56 sm:h-32 sm:w-64"
        />
      </h1>
      <p className="text-body-lg text-hero-heading">Coming Soon</p>
    </main>
  )
}
