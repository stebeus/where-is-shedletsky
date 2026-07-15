import type { User } from './schema.ts';

import { compare } from './crypto.ts';
import { findFirst } from './repository.ts';

export const authenticate = async ({ username, password }: User) => {
	const user = await findFirst(username);
	if (user == null) return false;

	const isMatch = await compare(password, user.password);
	return isMatch;
};

export const isUsernameAvailable = async (username: string) => (await findFirst(username)) == null;
