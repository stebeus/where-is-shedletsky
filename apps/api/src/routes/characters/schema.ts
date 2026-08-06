import { snakeCase } from 'drizzle-orm/pg-core';

export const characters = snakeCase.table('characters', (t) => ({
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: t.text().notNull(),
	description: t.text().notNull(),
	position: t.point({ mode: 'xy' }).notNull(),
}));
