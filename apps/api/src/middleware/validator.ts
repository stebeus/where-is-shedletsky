import type { ValidationTargets } from 'hono';

import { zValidator } from '@hono/zod-validator';
import * as z from 'zod';

export const validate = <Target extends keyof ValidationTargets, Schema extends z.ZodType>(
	target: Target,
	schema: Schema,
) =>
	zValidator(target, schema, (result, c) => {
		if (!result.success) {
			const flattenedError = z.flattenError(result.error);
			return c.json(flattenedError, 400);
		}
	});
