import { describe, expect, it } from 'vitest';

import { app } from '#app.ts';

const URL = '/api/v1/characters';

describe('GET /characters', () => {
	it('retrieves characters', async () => {
		const res = await app.request(URL);
		const { data } = await res.json();

		expect(res.status).toBe(200);
		expect(data).toBeDefined();
	});
});

describe('GET /characters/:name/position/:position', () => {
	describe('Given invalid payloads,', () => {
		it.for`
			case            | name          | position
			${'empty'}      | ${undefined}  | ${undefined}
			${'incomplete'} | ${'john_doe'} | ${undefined}
			${'incorrect'}  | ${'john_doe'} | ${'john_doe'}
		`('rejects requests with $case parameters', async ({ name, position }) => {
			const res = await app.request(`${URL}/${name}/position/${position}`);
			expect(res.status).toBe(400);
		});
	});

	it('retrieves a character', async () => {
		const res = await app.request(`${URL}/john_doe/position/0,0`);
		expect(res.status).toBe(200);
	});
});
