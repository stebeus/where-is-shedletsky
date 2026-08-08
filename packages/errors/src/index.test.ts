import { describe, expect, it } from 'vitest';

import { catchError } from './index.js';

describe('catchError', () => {
	describe('Given non-errors,', () => {
		it.for`
			case         | value
			${'numbers'} | ${0}
			${'strings'} | ${'string'}
			${'objects'} | ${{ key: 'value' }}
		`('catches $case', ({ value }) => {
			const { message } = catchError(value);
			expect(message).toBe(`Unexpected throw: ${JSON.stringify(value, undefined, '\t')}`);
		});

		it('catches bigints', () => {
			// Arrange
			const value = 1n;

			// Act
			const { message } = catchError(value);

			// Assert
			expect(message).toBe(`Unexpected throw: Unable to stringify ${typeof value}`);
		});
	});

	it('preserves errors', () => {
		// Arrange
		const value = new Error('error');

		// Act
		const { message } = catchError(value);

		// Assert
		expect(message).toBe('error');
	});
});
