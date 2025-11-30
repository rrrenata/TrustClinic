import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'shared-components': path.resolve(__dirname, '../shared-components/src')
    }
  },
  server: {
    port: 5173
  }
})
