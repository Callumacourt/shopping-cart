import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';

const { environments } = prettierPlugin;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
});
