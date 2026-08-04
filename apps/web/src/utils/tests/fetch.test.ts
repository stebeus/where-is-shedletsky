import { describe, expect, it } from 'vitest';

import { FetchError } from '#utils/fetch.ts';

describe('FetchError', () => {
	it('confirms that it is not a fetch error', () => {
		const error = new Error();
		expect(FetchError.isInstance(error)).toBeFalsy();
	});

	it('confirms that it is a fetch error', () => {
		const res = new Response();
		const error = new FetchError(res);
		expect(FetchError.isInstance(error)).toBeTruthy();
	});
});
