import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '#root/env.ts';

export const db = drizzle({
	connection: env.DATABASE_URL,
});
