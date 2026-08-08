import process from 'node:process';

import * as z from 'zod';

import { createEnv } from '@repo/env';
import { catchErrnoException } from '@repo/errors';

try {
	process.loadEnvFile();
} catch (error) {
	const caught = catchErrnoException(error);
	if (caught.code !== 'ENOENT') throw caught;
}

const dbUrlRegex = /(postgres(?:ql)?):\/\/(?:([^@\s]+)@)?([^/\s]+)(?:\/(\w+))?(?:\?(.+))?/;

export const env = createEnv(process.env, {
	CLIENT_URL: z.url().default('*'),
	DATABASE_URL: z.url().regex(dbUrlRegex),
	PORT: z.coerce.number().int().positive().default(3000),
});
