import { Hono } from 'hono';

import { authSchema } from '@repo/contracts/users';

import { validate } from '#middleware/validator.ts';

import { findMany } from './repository.ts';
import { signIn, signUp } from './services.ts';

export const users = new Hono();

users.get('/', async (c) => c.json({ data: await findMany() }));

users.post('/sign-up', validate('form', authSchema), async (c) => {
	const form = c.req.valid('form');
	const data = await signUp(form);
	return c.json({ data }, 201);
});

users.post('/sign-in', validate('form', authSchema), async (c) => {
	const form = c.req.valid('form');
	const data = await signIn(form);
	return c.json({ data }, 201);
});
