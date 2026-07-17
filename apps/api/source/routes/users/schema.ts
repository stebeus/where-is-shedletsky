import * as z from 'zod';

import { users } from '#root/database/schema.ts';

import { authenticate, isUsernameAvailable } from './services.ts';

const { username } = users;
const alphanumericRegex = /^\w+$/;

const formatMilliseconds = (value: number) => `${value} milliseconds`;

const bestTime = z.coerce.number().int().positive().transform(formatMilliseconds);

export const signinSchema = z
	.object({
		username: z.string(),
		password: z.string(),
		bestTime,
	})
	.refine(authenticate, 'Invalid credentials');

export const userSchema = z.object({
	username: z
		.string()
		.trim()
		.min(1, 'Field is required')
		.max(username.length as number, `Username cannot be longer than ${username.length} characters`)
		.regex(alphanumericRegex, 'Username must only contain alphanumeric characters')
		.refine(isUsernameAvailable, 'Username is already taken'),
	password: z.string().trim().min(8, 'Password must have at least 8 characters'),
	bestTime,
});

export type User = z.infer<typeof userSchema>;
