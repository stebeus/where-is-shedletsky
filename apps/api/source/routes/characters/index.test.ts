import { describe, expect, it } from 'vitest';

import { app } from '#root/app.ts';

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
	it.for`
		case            | name          | position
		${'empty'}      | ${null}       | ${null}
		${'incomplete'} | ${'john_doe'} | ${null}
		${'invalid'}    | ${1}          | ${'john_doe'}
	`('rejects $case request parameters', async ({ name, position }) => {
		const { status } = await app.request(`${URL}/${name}/position/${position}`);
		expect(status).toBe(400);
	});

	it('retrieves a character', async () => {
		const res = await app.request(`${URL}/john_doe/position/0,0`);
		expect(res.status).toBe(200);
	});
});
