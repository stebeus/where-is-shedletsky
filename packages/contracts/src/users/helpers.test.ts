import { describe, expect, it } from 'vitest';

import { formatMilliseconds } from './helpers.js';

describe('formatMilliseconds', () => {
	it('appends `ms` to numbers', () => {
		expect(formatMilliseconds(1)).toBe('1 ms');
	});
});
