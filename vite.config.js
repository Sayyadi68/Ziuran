import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../frontend_build', // خروجی build خارج از پوشه frontend
    emptyOutDir: true,
  },
  base: '/static', // مسیر درست برای Django
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: "127.0.0.1", 
    port: 3000, 
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // سرور Django
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
