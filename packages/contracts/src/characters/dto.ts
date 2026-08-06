import * as z from 'zod';

import { characterSchema } from './entity.js';
import { parsePosition } from './helpers.js';

const positionRegex = /[0-9]+,[0-9]+/;

export const getCharacterRequestSchema = z
	.object({
		...characterSchema.shape,
		position: z
			.string()
			.regex(positionRegex, 'Position must be formatted as `row,column`')
			.transform(parsePosition),
	})
	.omit({ id: true, description: true });

export type GetCharacterRequest = z.infer<typeof getCharacterRequestSchema>;
