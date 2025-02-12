import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // Handle client-side routing
    proxy: {
      '/showcase': {
        target: 'http://localhost:5173',
        rewrite: () => '/',
      }
    }
  },
  preview: {
    port: 5173
  }
})