import { pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', (t) => ({
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	username: t.varchar({ length: 50 }).notNull(),
	password: t.text().notNull(),
	bestTime: t.interval({ fields: 'hour to second', precision: 3 }).notNull(),
	createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
	updatedAt: t
		.timestamp({ withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date()),
}));

export const characters = pgTable('characters', (t) => ({
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: t.text().notNull(),
	description: t.text().notNull(),
	position: t.point({ mode: 'xy' }).notNull(),
}));
