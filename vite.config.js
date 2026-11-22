import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Integração futura: para evitar CORS em desenvolvimento, aponte um proxy
    // para o back-end e use VITE_API_URL=/api no .env.local.
    // proxy: { '/api': { target: 'http://localhost:3333', changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') } },
  },
  build: {
    rollupOptions: {
      output: {
        // Bibliotecas ficam em um chunk próprio (melhor cache entre deploys).
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
