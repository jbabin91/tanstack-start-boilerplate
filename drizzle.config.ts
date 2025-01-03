import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  casing: 'snake_case',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: 'postgresql',
  out: './app/lib/db/migrations',
  schema: './app/lib/db/schema',
});
