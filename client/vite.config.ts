import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../backend/public'
  },
  server: {
    proxy: {
      '/api' : 'http://localhost:3000',
      '/auth' : 'http://localhost:3000'
    }
  },
  plugins: [react()],
})
