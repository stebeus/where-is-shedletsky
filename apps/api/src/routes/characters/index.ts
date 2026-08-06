import { Hono } from 'hono';

import { getCharacterRequestSchema } from '@repo/contracts/characters';

import { validate } from '#middleware/validator.ts';

import { findFirst, findMany } from './repository.ts';

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
