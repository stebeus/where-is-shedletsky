import { Hono } from 'hono';

import { validate } from '#root/middleware/validator.ts';

import { findMany } from './repository.ts';
import { newUserSchema } from './schema.ts';
import { signIn, signUp } from './services.ts';

export const users = new Hono();

users.get('/', async (c) => c.json({ data: await findMany() }));

users.post('/sign-up', validate('form', newUserSchema), async (c) => {
	const form = c.req.valid('form');
	const data = await signUp(form);
	return c.json({ data }, 201);
});

users.post('/sign-in', validate('form', newUserSchema), async (c) => {
	const form = c.req.valid('form');
	const data = await signIn(form);
	return c.json({ data }, 201);
});
