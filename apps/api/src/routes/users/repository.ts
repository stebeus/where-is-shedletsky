import type { NewUser, UserUpdate } from '@repo/contracts/users';

import { eq } from 'drizzle-orm';

import { db } from '#db/client.ts';

import { users } from './schema.ts';

export const create = async (user: NewUser) => {
	const [data] = await db.insert(users).values(user).onConflictDoNothing().returning();
	return data;
};

export const findMany = async () => await db.select().from(users).orderBy(users.bestTime);

export const findByUsername = async (username: string) => {
	const [data] = await db.select().from(users).where(eq(users.username, username)).limit(1);
	return data;
};

export const update = async ({ username, bestTime }: UserUpdate) => {
	const [data] = await db
		.update(users)
		.set({ username, bestTime })
		.where(eq(users.username, username))
		.returning();

	return data;
};
