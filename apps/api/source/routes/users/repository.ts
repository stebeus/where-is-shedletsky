import type { User } from './schema.ts';

import { eq } from 'drizzle-orm';

import { users } from '#root/database/schema.ts';
import { database } from '#root/libraries/database.ts';

import { hash } from './crypto.ts';

export const create = async ({ username, password, bestTime }: User) => {
	const hashedPassword = await hash(password);

	const [data] = await database
		.insert(users)
		.values({ username, password: hashedPassword, bestTime })
		.returning();

	return data;
};

export const findMany = async () => await database.select().from(users).orderBy(users.bestTime);

export const findFirst = async (username: string) => {
	const [data] = await database.select().from(users).where(eq(users.username, username)).limit(1);
	return data;
};

export const update = async ({ username, bestTime }: User) => {
	const [data] = await database
		.update(users)
		.set({ username, bestTime })
		.where(eq(users.username, username))
		.returning();

	return data;
};
