import type { Character, CharacterParam } from './schema.ts';

import { and, eq, sql } from 'drizzle-orm';

import { characters } from '#root/database/schema.ts';
import { database } from '#root/libraries/database.ts';

export const create = async (character: Character) =>
	database.insert(characters).values(character).returning();

export const findMany = async () =>
	database.select().from(characters).orderBy(sql`lower(${characters.name})`);

export const findFirst = async ({ name, position: { x, y } }: CharacterParam) => {
	const [data] = await database
		.select()
		.from(characters)
		.where(and(eq(characters.name, name), sql`${characters.position} ~= point(${x}, ${y})`))
		.limit(1);

	return data;
};
