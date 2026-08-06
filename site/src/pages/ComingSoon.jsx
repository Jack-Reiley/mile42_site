import { H1 } from '../components/primitives.jsx'

/* The only public page until launch. The designed site is served under
   /working and nothing here links to it. */
export default function ComingSoon() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-brand px-6 text-center">
      <H1 tone="hero">Mile42</H1>
      <p className="text-body-lg text-hero-heading">Coming Soon</p>
    </main>
  )
}
