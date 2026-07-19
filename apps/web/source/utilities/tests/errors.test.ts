import { describe, expect, it } from 'vitest';

import { captureError } from '#root/utilities/errors.ts';

describe('captureError', () => {
	describe('Given non-error values,', () => {
		it('creates an error from them', () => {
			expect(captureError('string')).toBeInstanceOf(Error);
		});

		it.for`
			value               | expected
			${undefined}        | ${'undefined'}
			${1}                | ${'1'}
			${{ key: 'value' }} | ${'{\n\t"key": "value"\n}'}
			${1n}               | ${'Unable to stringify the thrown value'}
		`(
			'captures $value as "This value was not thrown as an error: $expected"',
			({ value, expected }) => {
				expect(captureError(value).message).toBe(
					`This value was not thrown as an error: ${expected}`,
				);
			},
		);
	});

	describe('Given error values,', () => {
		const error = new Error('error');

		it('preserves the error object', () => {
			expect(captureError(error)).toBeInstanceOf(Error);
		});

		it('preserves the error message', () => {
			expect(captureError(error).message).toBe('error');
		});
	});
});
