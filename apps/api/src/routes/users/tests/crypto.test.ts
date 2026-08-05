import { describe, expect, it } from 'vitest';

import { compare, hash } from '#routes/users/crypto.ts';

describe('compare', () => {
	it('confirms that the password mismatches the hash', async () => {
		// Arrange
		const hashedPassword = await hash('Correct password');

		// Act
		const isMatch = await compare(hashedPassword, 'Incorrect password');

		// Assert
		expect(isMatch).toBeFalsy();
	});

	it('confirms that the password matches the hash', async () => {
		// Arrange
		const hashedPassword = await hash('Correct password');

		// Act
		const isMatch = await compare(hashedPassword, 'Correct password');

		// Assert
		expect(isMatch).toBeTruthy();
	});
});
