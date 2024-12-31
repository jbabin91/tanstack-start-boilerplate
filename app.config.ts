import { defineConfig } from '@tanstack/start/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    compatibilityDate: '2024-12-31',
    preset: 'node-server',
  },
  vite: {
    plugins: [
      tsconfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
});
