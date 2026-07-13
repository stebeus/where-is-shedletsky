import { defineConfig } from 'drizzle-kit';

import { env } from './source/env.ts';

export default defineConfig({
	casing: 'snake_case',
	dialect: 'postgresql',
	schema: './source/database/schema.ts',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
