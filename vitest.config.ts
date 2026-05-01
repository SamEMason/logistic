import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Essential because your store uses 'persist' (localStorage)
  },
  resolve: {
    alias: {
      // This maps the "@" symbol to your project root
      '@': path.resolve(__dirname, './src/'),
    },
  },
});
