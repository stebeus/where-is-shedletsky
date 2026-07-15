import process from 'node:process';

import { create as createCharacter } from '#root/routes/characters/repository.ts';

const characters = [
	{
		name: 'sk8r',
		description: 'A skilled skater',
		position: { x: 3, y: 2 },
	},
	{
		name: 'erik.cassel',
		description: 'A deceased co-founder of ROBLOX',
		position: { x: 8, y: 5 },
	},
	{
		name: 'Astronaut',
		description: 'A sailor of the outer space',
		position: { x: 29, y: 7 },
	},
	{
		name: 'bleu_lampshade',
		description: 'A guy with a blue chevroned lampshade',
		position: { x: 6, y: 8 },
	},
	{
		name: 'Take_aChance',
		description: 'A red master of dices and randomness',
		position: { x: 9, y: 8 },
	},
	{
		name: 'JohnDale',
		description: 'An apparent director of the John Dale middle school',
		position: { x: 11, y: 8 },
	},
	{
		name: 'roundyhead',
		description: 'A rounded head dude',
		position: { x: 15, y: 8 },
	},
	{
		name: 'TrimHead',
		description: 'A trimmed head dude',
		position: { x: 16, y: 8 },
	},
	{
		name: 'BLOCKY_HEAD',
		description: 'An angry cubic head dude',
		position: { x: 17, y: 8 },
	},
	{
		name: 'SpiderMan',
		description: 'One of the most famous Marvel superheroes',
		position: { x: 20, y: 8 },
	},
	{
		name: '4ng3l',
		description: 'A winged edgy guy',
		position: { x: 23, y: 8 },
	},
	{
		name: 'unimpeachable_soul',
		description: 'An unbeatable white ninja',
		position: { x: 26, y: 8 },
	},
	{
		name: 'Guest 1918',
		description: 'The first player without an account in this image',
		position: { x: 18, y: 9 },
	},
	{
		name: 'Presswoman',
		description: 'A woman with a newspaper hat',
		position: { x: 3, y: 10 },
	},
	{
		name: 'recko_gamer1',
		description: 'A guy whose shirt says "Recko games fans"',
		position: { x: 6, y: 10 },
	},
	{
		name: 'ThatOneSkepticalL0Lzr',
		description: 'A funny dubious guy',
		position: { x: 9, y: 10 },
	},
	{
		name: 'Noob',
		description: 'A yellow novice',
		position: { x: 13, y: 10 },
	},
	{
		name: 'BettyBloxxer',
		description: 'A gal who used to be the female guest image',
		position: { x: 16, y: 10 },
	},
	{
		name: 'Guest 21022',
		description: 'The second player without an account in this image',
		position: { x: 22, y: 10 },
	},
	{
		name: 'cokenadian',
		description: 'A Canadian lover of Coca-Cola',
		position: { x: 25, y: 10 },
	},
	{
		name: 'BillyBloxxer',
		description: 'A guy who used to be the female guest image',
		position: { x: 28, y: 10 },
	},
	{
		name: 'BaconHair',
		description: 'A male novice whose hair resembles strips of pork',
		position: { x: 29, y: 10 },
	},
	{
		name: 'dopemine',
		description: 'A guy full of dope hormone',
		position: { x: 32, y: 10 },
	},
	{
		name: 'iceyGurl',
		description: 'A girl who loves ice cream',
		position: { x: 1, y: 12 },
	},
	{
		name: 'memelord',
		description: 'The master of modern comedy',
		position: { x: 5, y: 12 },
	},
	{
		name: 'Shedletsky',
		description: 'An epic yellow admin who loves fried chicken',
		position: { x: 7, y: 12 },
	},
	{
		name: 'droolber',
		description: 'A drooling noob',
		position: { x: 10, y: 12 },
	},
	{
		name: 'CalisthenicsGuru',
		description: 'A strong guy',
		position: { x: 12, y: 12 },
	},
	{
		name: 'twitter_girl',
		description: 'A girl whose sweater colors resemble that blue bird social media',
		position: { x: 15, y: 12 },
	},
	{
		name: 'builderman',
		description: 'An admin with a construction helmet',
		position: { x: 17, y: 12 },
	},
	{
		name: 'ROBLOX',
		description: "The official account of this game's theme",
		position: { x: 19, y: 12 },
	},
	{
		name: 'KoalaPrincess',
		description: 'A girl fond of koalas',
		position: { x: 20, y: 12 },
	},
	{
		name: 'theOrangeDomo',
		description: 'A guy wearing an orange shirt of that Japanese boxy furry monster',
		position: { x: 24, y: 12 },
	},
	{
		name: 'happy_emo',
		description: "A guy with sad-colored clothes who's smiling",
		position: { x: 27, y: 12 },
	},
	{
		name: 'yaLikeTrains',
		description: 'A girl whose shirt says "I like trains"',
		position: { x: 30, y: 12 },
	},
	{
		name: 'blind_rainbowz',
		description: 'An unsighted girl with rainbow wristbands',
		position: { x: 32, y: 12 },
	},
	{
		name: 'AcornHair',
		description: 'A female novice whose hair resembles red acorns',
		position: { x: 32, y: 12 },
	},
	{
		name: 'yellowt3a',
		description: 'The creator of this image',
		position: { x: 2, y: 14 },
	},
	{
		name: 'builderfan123',
		description: 'An apparent fan of builderman',
		position: { x: 10, y: 14 },
	},
	{
		name: 'Clever_Pigtails',
		description: 'A blonde pigtailed nerd',
		position: { x: 21, y: 14 },
	},
] as const;

console.log('Seeding...');

try {
	const data = await Promise.all(characters.map(createCharacter));
	console.log('Done:', data);
	process.exit(0);
} catch (error) {
	console.error(error);
	process.exit(1);
}
