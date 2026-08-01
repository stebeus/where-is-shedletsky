import { snakeCase } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-orm/zod';
import * as z from 'zod';

export const users = snakeCase.table('users', (t) => ({
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	username: t.varchar({ length: 50 }).notNull().unique(),
	password: t.text().notNull(),
	bestTime: t.interval({ fields: 'hour to second', precision: 3 }).notNull(),
	createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
	updatedAt: t
		.timestamp({ withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date()),
}));

const { username } = users;
const alphanumericRegex = /^\w+$/;

const formatMilliseconds = (value: number) => `${value} ms`;

export const newUserSchema = createInsertSchema(users, {
	username: (schema) =>
		schema
			.trim()
			.min(1, 'Username is required')
			.max(
				username.length as number,
				`Username cannot be longer than ${username.length} characters`,
			)
			.regex(alphanumericRegex, 'Username must only contain alphanumeric characters'),
	password: (schema) => schema.trim().min(8, 'Password must be at least 8 characters long'),
	bestTime: z.coerce.number().int().positive().transform(formatMilliseconds),
}).omit({ createdAt: true, updatedAt: true });

export type NewUser = z.infer<typeof newUserSchema>;

export type UserUpdate = Pick<NewUser, 'username' | 'bestTime'>;
