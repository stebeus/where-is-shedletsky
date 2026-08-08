import * as z from 'zod';

import { newUserSchema, type User } from './entity.js';
import { formatMilliseconds } from './helpers.js';

export const authSchema = z.object({
	...newUserSchema.shape,
	bestTime: z.coerce.number().int().positive().transform(formatMilliseconds),
});

export type GetUserResponse = Omit<User, 'password'>;
