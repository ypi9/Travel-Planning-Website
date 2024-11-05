import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // set up the proxy on own domain,
      //   // forware the request to target link
      //   // so the request made on the server side 
      '/api/googleApi': {
        target: 'https://maps.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/googleApi/, ''),
      },
    }
  }



})
