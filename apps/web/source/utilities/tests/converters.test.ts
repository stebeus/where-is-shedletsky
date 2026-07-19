import { describe, expect, it } from 'vitest';

import { toCamelCase } from '#root/utilities/converters.ts';

describe('toCamelCase', () => {
	it('camel cases words', () => {
		expect(toCamelCase('Hello, kebab-ca$e_2!')).toBe('helloKebabCa$e_2');
	});
});
