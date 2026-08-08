import { Hono } from 'hono';

import { authSchema } from '@repo/contracts/users';

import { validate } from '#middleware/validator.ts';

import { findMany } from './repository.ts';
import { signIn, signUp } from './services.ts';

export const users = new Hono();

users.get('/', async (c) => c.json({ data: await findMany() }));

users.post('/sign-up', validate('json', authSchema), async (c) => {
	const newUser = c.req.valid('json');
	const data = await signUp(newUser);
	return c.json({ data }, 201);
});

users.post('/sign-in', validate('json', authSchema), async (c) => {
	const newUser = c.req.valid('json');
	const data = await signIn(newUser);
	return c.json({ data }, 201);
});
