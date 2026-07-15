import process from 'node:process';

import { create } from '#root/routes/characters/repository.ts';

import characters from './characters.json' with { type: 'json' };

console.log('Seeding...');

try {
	const data = await Promise.all(characters.map(create));
	console.log('Done:', data);
	process.exit(0);
} catch (error) {
	console.error(error);
	process.exit(1);
}
