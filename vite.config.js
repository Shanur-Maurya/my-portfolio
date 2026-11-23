
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/my-portfolio/',
  server: {
    host: '0.0.0.0',
    allowedHosts: true
  }
})
