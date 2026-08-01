import { snakeCase } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-orm/zod';
import * as z from 'zod';

export const characters = snakeCase.table('characters', (t) => ({
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: t.text().notNull(),
	description: t.text().notNull(),
	position: t.point({ mode: 'xy' }).notNull(),
}));

export type NewCharacter = typeof characters.$inferInsert;

const positionRegex = /[0-9]+,[0-9]+/;

const parsePosition = (value: string) => {
	const [row, column] = value.split(',').map(Number);
	return { x: column, y: row };
};

export const getCharacterRequestSchema = createSelectSchema(characters, {
	position: z
		.string()
		.regex(positionRegex, 'Position must be formatted as "row,column"')
		.transform(parsePosition),
}).omit({ id: true, description: true });

export type GetCharacterRequest = z.infer<typeof getCharacterRequestSchema>;
