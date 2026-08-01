import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const KEY_LENGTH = 64;

const promisifiedScrypt = promisify(scrypt);

export const hash = async (string: string) => {
	const salt = randomBytes(16).toHex();
	const derivedKey = await promisifiedScrypt(string, salt, KEY_LENGTH);
	return `${salt}:${(derivedKey as Buffer).toHex()}`;
};

export const compare = async (hash: string, string: string) => {
	const [salt, key] = hash.split(':');

	const buffer = Buffer.from(key, 'hex');
	const derivedKey = await promisifiedScrypt(string, salt, KEY_LENGTH);

	return timingSafeEqual(buffer, derivedKey as Buffer);
};
