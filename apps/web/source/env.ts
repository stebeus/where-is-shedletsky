import * as z from 'zod';

const schema = z.object({
	VITE_APP_NAME: z.string(),
	VITE_API_URL: z.url(),
});

const { success, error, data } = z.safeParse(schema, import.meta.env);

if (!success) throw new Error(z.prettifyError(error));

export const env = data;
