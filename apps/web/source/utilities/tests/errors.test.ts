import { describe, expect, it } from 'vitest';

import { captureError } from '#root/utilities/errors.ts';

describe('captureError', () => {
	describe('Given non-error values,', () => {
		it('creates an error from them', () => {
			const capturedError = captureError('string');
			expect(capturedError).toBeInstanceOf(Error);
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
				const capturedError = captureError(value);
				expect(capturedError.message).toBe(`This value was not thrown as an error: ${expected}`);
			},
		);
	});

	describe('Given error values,', () => {
		it('preserves the error object', () => {
			// Arrange
			const error = new Error();

			// Act
			const capturedError = captureError(error);

			// Assert
			expect(capturedError).toBeInstanceOf(Error);
		});

		it('preserves the error message', () => {
			// Arrange
			const error = new Error('error');

			// Act
			const capturedError = captureError(error);

			// Assert
			expect(capturedError.message).toBe('error');
		});
	});
});
