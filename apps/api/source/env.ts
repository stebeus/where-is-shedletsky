import process from 'node:process';

import * as z from 'zod';

import { isErrnoException } from './utilities/errors.ts';

try {
	process.loadEnvFile();
} catch (error) {
	if (isErrnoException(error) && error.code !== 'ENOENT') throw error;
}

const databaseUrlRegex = /(postgres(?:ql)?):\/\/(?:([^@\s]+)@)?([^/\s]+)(?:\/(\w+))?(?:\?(.+))?/;

const schema = z.object({
	CLIENT_URL: z.url().default('*'),
	DATABASE_URL: z.url().regex(databaseUrlRegex),
	PORT: z.coerce.number().int().positive().default(3000),
});

const { success, error, data } = z.safeParse(schema, process.env);

if (!success) throw new Error(z.prettifyError(error));

export const env = data;
