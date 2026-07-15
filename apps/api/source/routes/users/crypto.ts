import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const KEY_LENGTH = 64;

const scryptPromise = promisify(scrypt);

export const hash = async (password: string) => {
	const salt = randomBytes(16).toHex();
	const derivedKey = await scryptPromise(password, salt, KEY_LENGTH);
	return `${salt}:${(derivedKey as Buffer).toHex()}`;
};

export const compare = async (password: string, hash: string) => {
	const [salt, key] = hash.split(':');

	const buffer = Buffer.from(key, 'hex');
	const derivedKey = await scryptPromise(password, salt, KEY_LENGTH);

	return timingSafeEqual(buffer, derivedKey as Buffer);
};
