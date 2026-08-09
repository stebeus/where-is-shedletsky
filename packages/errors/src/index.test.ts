import { describe, expect, it } from 'vitest';

import { catchError } from './index.js';

describe('catchError', () => {
	describe('Given non-errors,', () => {
		describe.for`
			case         | value
			${'numbers'} | ${0}
			${'strings'} | ${'string'}
			${'objects'} | ${{ key: 'value' }}
		`('When they are $case,', ({ value }) => {
			const caught = catchError(value);

			it('creates an error from them', () => {
				expect(caught).toBeInstanceOf(Error);
			});

			it('describes them', () => {
				expect(caught.message).toBe(`Unexpected throw: ${JSON.stringify(value, undefined, '\t')}`);
			});
		});

		describe('When they are bigints,', () => {
			const value = 1n;
			const caught = catchError(value);

			it('creates an error from them', () => {
				expect(caught).toBeInstanceOf(Error);
			});

			it('describes them', () => {
				expect(caught.message).toBe(`Unexpected throw: [Unable to stringify ${typeof value}]`);
			});
		});
	});

	describe('Given errors,', () => {
		const value = new Error('error');
		const caught = catchError(value);

		it('preserves their constructor', () => {
			expect(caught).toBeInstanceOf(Error);
		});

		it('preserves their message', () => {
			expect(caught.message).toBe('error');
		});
	});
});
