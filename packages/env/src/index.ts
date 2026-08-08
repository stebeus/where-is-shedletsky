import * as z from 'zod';

export const createEnv = <Schema extends z.ZodRawShape>(env: unknown, schema: Schema) => {
	const envSchema = z.object(schema);
	const { success, error, data } = z.safeParse(envSchema, env);

	if (!success) throw new Error(z.prettifyError(error));

	return data;
};
