import * as z from 'zod';

import { newUserSchema, type User } from './entity.js';
import { formatMilliseconds } from './helpers.js';

const alphanumericRegex = /^\w+$/;

export const authSchema = z.object({
	...newUserSchema.shape,
	username: z
		.string()
		.trim()
		.min(1, 'Username is required')
		.max(50, 'Username cannot be longer than 50 characters')
		.regex(alphanumericRegex, 'Username must only contain alphanumeric characters'),
	password: z.string().trim().min(8, 'Password must be at least 8 characters long'),
	bestTime: z.coerce.number().int().transform(formatMilliseconds),
});

export type GetUserRequest = Omit<User, 'password'>;
