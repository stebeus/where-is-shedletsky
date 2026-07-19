import { describe, expect, it } from 'vitest';

import { toCamelCase } from '#root/utilities/converters.ts';

describe('toCamelCase', () => {
	it('camel cases words', () => {
		const camelCased = toCamelCase('Hello, kebab-ca$e_2!');
		expect(camelCased).toBe('helloKebabCa$e_2');
	});
});
