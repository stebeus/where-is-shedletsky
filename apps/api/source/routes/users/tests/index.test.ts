import { describe, expect, it } from 'vitest';

import { app } from '#root/app.ts';

const URL = '/api/v1/users';

const generateUsername = (username = 'JohnDoe') =>
	`${username}_${Temporal.Now.instant().epochMilliseconds}`;

const generateBestTime = () => {
	const oneHour = 60 * 60 * 1000;
	const bestTime = Math.random() * oneHour;
	return Math.ceil(bestTime).toString();
};

const createUser = (username = '', password = '', bestTime = '') =>
	new URLSearchParams({ username, password, bestTime });

describe('GET /users', () => {
	it('retrieves users', async () => {
		const res = await app.request(URL);
		const { data } = await res.json();

		expect(res.status).toBe(200);
		expect(data).toBeDefined();
	});
});

describe('POST /users/sign-in', () => {
	it.for`
		case            | body
		${'empty'}      | ${null}
		${'incomplete'} | ${createUser('john_doe', '12345678')}
		${'invalid'}    | ${createUser('john_doe', 'abcdefgh', generateBestTime())}
	`('rejects $case request bodies', async ({ body }) => {
		const res = await app.request(`${URL}/sign-in`, { method: 'POST', body });
		expect(res.status).toBe(400);
	});

	it('signs the user in', async () => {
		// Arrange
		const body = createUser('john_doe', '12345678', generateBestTime());

		await app.request(`${URL}/sign-up`, { method: 'POST', body });

		// Act
		const res = await app.request(`${URL}/sign-in`, { method: 'POST', body });
		const { data } = await res.json();

		// Assert
		expect(res.status).toBe(201);
		expect(data).toBeDefined();
	});
});

describe('POST /users/sign-up', () => {
	it.for`
		case            | body
		${'empty'}      | ${null}
		${'incomplete'} | ${createUser('john_doe', '12345678')}
	`('rejects $case request bodies', async ({ body }) => {
		const res = await app.request(`${URL}/sign-up`, { method: 'POST', body });
		expect(res.status).toBe(400);
	});

	it('rejects non-alphanumeric usernames', async () => {
		// Arrange
		const body = createUser('John Doe', '12345678', generateBestTime());

		// Act
		const res = await app.request(`${URL}/sign-up`, { method: 'POST', body });

		// Assert
		expect(res.status).toBe(400);
	});

	it('creates a user', async () => {
		// Arrange
		const body = createUser(generateUsername(), '12345678', generateBestTime());

		// Act
		const res = await app.request(`${URL}/sign-up`, { method: 'POST', body });
		const { data } = await res.json();

		// Assert
		expect(res.status).toBe(201);
		expect(data).toBeDefined();
	});
});
