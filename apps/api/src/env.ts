import process from 'node:process';

import * as z from 'zod';

import { isErrnoException } from './utils/errors.ts';

try {
	process.loadEnvFile();
} catch (error) {
	if (isErrnoException(error) && error.code !== 'ENOENT') throw error;
}

const dbUrlRegex = /(postgres(?:ql)?):\/\/(?:([^@\s]+)@)?([^/\s]+)(?:\/(\w+))?(?:\?(.+))?/;

const envSchema = z.object({
	CLIENT_URL: z.url().default('*'),
	DATABASE_URL: z.url().regex(dbUrlRegex),
	PORT: z.coerce.number().int().positive().default(3000),
});

const { success, error, data } = z.safeParse(envSchema, process.env);

if (!success) throw new Error(z.prettifyError(error));

export const env = data;
