import { useEffect, useRef } from 'react'

/**
 * Drifts its contents very slightly toward the pointer.
 *
 * The one detail on the page that answers the reader directly rather than
 * answering the scroll. It is deliberately small — this is a hand-drawn
 * illustration on a page about execution, not a product render, and anything
 * larger would read as a gimmick rather than as the drawing being alive.
 *
 * The transform lives on this wrapper and never on the child, because the child
 * carries the reveal animation and two things cannot own one transform.
 *
 * Three things switch it off entirely: a coarse pointer, since there is nothing
 * to follow on a touchscreen; a request for reduced motion; and the hero being
 * off screen, which is most of the time on a long page.
 */
export default function PointerParallax({ className = '', children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    /* Guarded rather than assumed. An environment without matchMedia would
       otherwise throw during mount and take the whole page down with it — which
       is a poor trade for a decorative effect. */
    if (typeof window.matchMedia !== 'function') return
    if (typeof IntersectionObserver === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const scope = el.closest('section') ?? el
    let frame = 0
    let live = true

    /* Unitless, from -1 to 1. The stylesheet multiplies by the distance token,
       so how far it travels stays a design value rather than a number in here. */
    const set = (x, y) => {
      el.style.setProperty('--parallax-x', String(x))
      el.style.setProperty('--parallax-y', String(y))
    }

    /* Measured against the scope rather than the element, so the drift tracks
       where the pointer is in the band as a whole. Against the illustration's
       own box it would hit full deflection a few pixels outside the artwork and
       then sit pinned there. */
    const onMove = (event) => {
      if (!live) return
      /* Cancel and reschedule rather than latching on a pending frame. A latch
         holds only as long as every frame it books actually runs; drop one and
         it never reopens. This collapses to the same one-update-per-frame and
         cannot wedge. */
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        frame = 0
        const box = scope.getBoundingClientRect()
        const x = (event.clientX - (box.left + box.width / 2)) / (box.width / 2)
        const y = (event.clientY - (box.top + box.height / 2)) / (box.height / 2)
        set(clamp(x), clamp(y))
      })
    }

    const onLeave = () => set(0, 0)

    const visibility = new IntersectionObserver(([entry]) => {
      live = entry.isIntersecting
      if (!live) onLeave()
    })
    visibility.observe(scope)

    scope.addEventListener('pointermove', onMove)
    scope.addEventListener('pointerleave', onLeave)
    return () => {
      visibility.disconnect()
      scope.removeEventListener('pointermove', onMove)
      scope.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className={`m42-parallax ${className}`}>
      {children}
    </div>
  )
}

/** Deflection is capped so a pointer at the far corner is not a special case. */
const clamp = (n) => Math.max(-1, Math.min(1, n))
