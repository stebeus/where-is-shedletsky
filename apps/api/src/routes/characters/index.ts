import { Hono } from 'hono';

import { validate } from '#middleware/validator';

import { findFirst, findMany } from './repository.ts';
import { getCharacterRequestSchema } from './schema.ts';

export const characters = new Hono();

characters.get('/', async (c) => c.json({ data: await findMany() }));

characters.get(
	'/:name/position/:position',
	validate('param', getCharacterRequestSchema),
	async (c) => {
		const param = c.req.valid('param');
		const data = await findFirst(param);
		return c.json({ data });
	},
);
