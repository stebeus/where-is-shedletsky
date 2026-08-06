import * as z from 'zod';

const positionSchema = z.object({
	x: z.int(),
	y: z.int(),
});

export const characterSchema = z.object({
	id: z.int().positive(),
	name: z.string(),
	description: z.string(),
	position: positionSchema,
});

export const newCharacterSchema = characterSchema.omit({ id: true });

export type Character = z.infer<typeof characterSchema>;

export type NewCharacter = z.infer<typeof newCharacterSchema>;
