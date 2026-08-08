import process from 'node:process';

import * as z from 'zod';

import { createEnv } from '@repo/env';

import { isErrnoException } from './utils/index.ts';

try {
	process.loadEnvFile();
} catch (error) {
	if (isErrnoException(error) && error.code !== 'ENOENT') throw error;
}

const dbUrlRegex = /(postgres(?:ql)?):\/\/(?:([^@\s]+)@)?([^/\s]+)(?:\/(\w+))?(?:\?(.+))?/;

export const env = createEnv(process.env, {
	CLIENT_URL: z.url().default('*'),
	DATABASE_URL: z.url().regex(dbUrlRegex),
	PORT: z.coerce.number().int().positive().default(3000),
});
