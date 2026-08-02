import { describe, expect, it } from 'vitest';

import { toCamelCase } from './formatters.ts';

describe('toCamelCase', () => {
	it('camel cases strings', () => {
		expect(toCamelCase('Hello, $W0rl_-d! !')).toBe('helloW0rlD');
	});
});
