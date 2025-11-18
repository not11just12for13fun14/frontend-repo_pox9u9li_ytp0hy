import { defineConfig } from 'vite'

// React plugin is optional; esbuild handles JSX by default. We only set the dev server port.
export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
})
