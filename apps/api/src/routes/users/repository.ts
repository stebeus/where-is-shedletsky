import type { NewUser, UserUpdate } from '@repo/contracts/users';

import { and, eq, gt, sql } from 'drizzle-orm';

import { db } from '#db/client.ts';

import { users } from './schema.ts';

export const create = async (user: NewUser) => {
	const [data] = await db.insert(users).values(user).onConflictDoNothing().returning();
	return data;
};

export const findMany = async () => {
	const { id, username, bestTime, createdAt, updatedAt } = users;

	return await db
		.select({
			id,
			username,
			bestTime: sql`extract(epoch from ${bestTime}) * 1000`.mapWith(Number),
			createdAt,
			updatedAt,
		})
		.from(users)
		.orderBy(bestTime);
};

export const findByUsername = async (username: string) => {
	const [data] = await db.select().from(users).where(eq(users.username, username)).limit(1);
	return data;
};

export const update = async ({ username, bestTime }: UserUpdate) => {
	const [data] = await db
		.update(users)
		.set({ username, bestTime })
		.where(and(eq(users.username, username), gt(users.bestTime, bestTime)))
		.returning();

	return data;
};
