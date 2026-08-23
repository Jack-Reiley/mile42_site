import { it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Link } from 'react-router'

it('probe', () => {
  render(
    <MemoryRouter basename="/working" initialEntries={['/working/']}>
      <Link to="mailto:hello@mile42.ai">A</Link>
      <Link to="/contact">B</Link>
      <a href="mailto:hello@mile42.ai">C</a>
    </MemoryRouter>,
  )
  const got = screen.getAllByRole('link').map((l) => [l.textContent, l.getAttribute('href')])
  console.log('PROBE ' + JSON.stringify(got))
})
