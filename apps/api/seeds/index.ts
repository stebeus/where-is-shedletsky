import { exit } from 'node:process';

import { create } from '#routes/characters/repository';

import characters from './characters.json' with { type: 'json' };

console.log('Seeding...');

try {
	const data = await Promise.all(characters.map(create));
	console.log('Done:', data);
	exit(0);
} catch (error) {
	console.error(error);
	exit(1);
}
