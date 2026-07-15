import { sValidator } from '@hono/standard-validator';
import { Hono } from 'hono';

import { create, findMany, update } from './repository.ts';
import { signinSchema, userSchema } from './schema.ts';

export const users = new Hono();

users.get('/', async (c) => c.json({ data: await findMany() }));

users.post('/sign-in', sValidator('form', signinSchema), async (c) => {
	const form = c.req.valid('form');
	const data = await update(form);

	c.status(201);
	return c.json({ data });
});

users.post('/sign-up', sValidator('form', userSchema), async (c) => {
	const form = c.req.valid('form');
	const data = await create(form);

	c.status(201);
	return c.json({ data });
});
