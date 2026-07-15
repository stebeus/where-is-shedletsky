import * as z from 'zod';

const positionRegex = /[0-9]+,[0-9]+/;

const coercePosition = (value: string) => {
	const [row, column] = value.split(',');
	return { x: Number(column), y: Number(row) };
};

const characterSchema = z.object({
	name: z.string(),
	description: z.string(),
	position: z
		.string()
		.regex(positionRegex, 'Position must be formatted as "row,column"')
		.transform(coercePosition),
});

export const paramSchema = characterSchema.omit({ description: true });

export type Character = z.infer<typeof characterSchema>;

export type CharacterParam = Omit<Character, 'description'>;
