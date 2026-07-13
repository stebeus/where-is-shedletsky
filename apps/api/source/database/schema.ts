import { pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', (t) => ({
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	username: t.varchar({ length: 50 }).notNull(),
	password: t.text().notNull(),
	bestTime: t.interval({ fields: 'hour to second', precision: 3 }),
	createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
	updatedAt: t
		.timestamp({ withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date()),
}));
