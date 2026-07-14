import { sValidator } from '@hono/standard-validator';
import { Hono } from 'hono';

import { findFirst, findMany } from './repository.ts';
import { paramSchema } from './schema.ts';

export const characters = new Hono();

characters.get('/', async (c) => c.json({ data: await findMany() }));

characters.get('/:name/position/:position', sValidator('param', paramSchema), async (c) => {
	const param = c.req.valid('param');
	const data = await findFirst(param);
	return c.json({ data });
});
