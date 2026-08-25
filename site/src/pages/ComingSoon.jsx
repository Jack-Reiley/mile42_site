import logo from '../assets/mile42-logo-light.svg'

/* The only public page until launch. The designed site is served under
   /working and nothing here links to it. */
/* The lockup carries the page's only heading, so it stays inside an `h1` with
   the mark's name as its alt text rather than replacing the heading with a
   bare image. The width holds the mark's lettering at the 57px the H1 token
   set before the logo landed, and gives way to the viewport on a phone. */
export default function ComingSoon() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-brand px-6 text-center">
      <h1>
        <img
          src={logo}
          alt="Mile42"
          width="242"
          height="120"
          className="block h-auto w-[min(16rem,70vw)]"
        />
      </h1>
      <p className="text-body-lg text-hero-heading">Coming Soon</p>
    </main>
  )
}
