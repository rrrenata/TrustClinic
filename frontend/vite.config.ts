import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [tailwindcss(), react()],
 resolve: {
  alias: {
    "shared-components": path.resolve(__dirname, "../shared-components/src"),
    react: path.resolve(__dirname, "node_modules/react"),
    "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    "react-dom/client": path.resolve(__dirname, "node_modules/react-dom/client"),
    "react/jsx-runtime": path.resolve(__dirname, "node_modules/react/jsx-runtime"),
    "react/jsx-dev-runtime": path.resolve(__dirname, "node_modules/react/jsx-dev-runtime"),
  },
  dedupe: ["react", "react-dom"],
},
  server: {
    port: 5173
  }
})
