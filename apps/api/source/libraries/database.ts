import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '#root/env.ts';

export const database = drizzle({
	casing: 'snake_case',
	connection: env.DATABASE_URL,
});
