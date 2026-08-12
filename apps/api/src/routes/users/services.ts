import type { NewUser } from '@repo/contracts/users';

import { ApiError } from '#utils/errors.ts';

import { compare, hash } from './crypto.ts';
import { create, findByUsername, update } from './repository.ts';

export const signUp = async ({ username, password, bestTime }: NewUser) => {
	const user = await findByUsername(username);
	if (user != null) throw new ApiError(409, { message: 'Username is already taken' });

	const hashedPassword = await hash(password);
	return await create({ username, password: hashedPassword, bestTime });
};

export const signIn = async ({ username, password, bestTime }: NewUser) => {
	const unauthorizedError = new ApiError(401, { message: 'Invalid credentials' });

	const user = await findByUsername(username);
	if (user == null) throw unauthorizedError;

	const isMatch = await compare(user.password, password);
	if (!isMatch) throw unauthorizedError;

	return await update({ username, bestTime });
};
