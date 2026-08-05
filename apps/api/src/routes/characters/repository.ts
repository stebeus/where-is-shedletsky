import { and, eq, sql } from 'drizzle-orm';

import { db } from '#db/client.ts';

import { characters, type GetCharacterRequest, type NewCharacter } from './schema.ts';

export const create = async (character: NewCharacter) => {
	const [data] = await db.insert(characters).values(character).returning();
	return data;
};

export const findMany = async () =>
	await db.select().from(characters).orderBy(sql`lower(${characters.name})`);

export const findFirst = async ({ name, position: { x, y } }: GetCharacterRequest) => {
	const [data] = await db
		.select()
		.from(characters)
		.where(and(eq(characters.name, name), sql`${characters.position} ~= point(${x}, ${y})`))
		.limit(1);

	return data;
};
