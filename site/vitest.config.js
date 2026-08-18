import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

/* Separate from vite.config.js so the test run does not pull in the Tailwind
   plugin. The tests assert on roles, names, and state, never on rendered
   styling, so compiling the stylesheet would only cost time. */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.jsx'],
    setupFiles: ['./src/test-setup.js'],
  },
})
