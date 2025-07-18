import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Evitar warnings de React 19 con Ant Design
    __DEV__: process.env.NODE_ENV !== 'production',
  },
  optimizeDeps: {
    include: ['antd'],
  },
});
