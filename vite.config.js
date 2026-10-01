
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // O site é servido pelo GitHub Pages em /rta-ambiental-github-pages/.
  base: process.env.NODE_ENV === 'production' ? '/rta-ambiental-github-pages/' : '/',
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
