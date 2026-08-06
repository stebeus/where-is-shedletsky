import { snakeCase } from 'drizzle-orm/pg-core';

import { userSchema } from '@repo/contracts/users';

const { username } = userSchema.shape;

export const users = snakeCase.table('users', (t) => ({
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	username: t
		.varchar({ length: username.maxLength as number })
		.notNull()
		.unique(),
	password: t.text().notNull(),
	bestTime: t.interval({ fields: 'hour to second', precision: 3 }).notNull(),
	createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
	updatedAt: t
		.timestamp({ withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date()),
}));
