import type { ValidationTargets } from 'hono';
import type * as z from 'zod';

import { flattenErrors, sValidator } from '@hono/standard-validator';

export const validate = <Target extends keyof ValidationTargets, Schema extends z.ZodType>(
	target: Target,
	schema: Schema,
) =>
	sValidator(target, schema, (result, c) => {
		if (!result.success) {
			const flattenedErrors = flattenErrors(result.error);
			return c.json(flattenedErrors, 400);
		}
	});
