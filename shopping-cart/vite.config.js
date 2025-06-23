import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';

const { environments } = prettierPlugin;

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/Tests/setup.js',
  },
   server: {
    host: '0.0.0.0',
    port: 5173, 
  }
});
