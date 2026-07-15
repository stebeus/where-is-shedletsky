import { describe, expect, it } from 'vitest';

import { compare, hash } from '#root/routes/users/crypto.ts';

describe('compare', () => {
	it('confirms that the password mismatches the hash', async () => {
		// Arrange
		const passwordHash = await hash('Hello, world!');

		// Act
		const isMatch = await compare('Goodbye, world!', passwordHash);

		// Assert
		expect(isMatch).toBeFalsy();
	});

	it('confirms that the password matches the hash', async () => {
		// Arrange
		const passwordHash = await hash('Hello, world!');

		// Act
		const isMatch = await compare('Hello, world!', passwordHash);

		// Assert
		expect(isMatch).toBeTruthy();
	});
});
