import type { Character } from '@repo/contracts/characters';
import type { CharacterUi, Position } from './types.ts';

import { createSafeContext } from '#hooks/context.tsx';
import { fetchData } from '#utils/fetch.ts';

const enrichCharacter = (character: Character) => ({ ...character, wasFound: false }) as const;

const fetchCharacters = async () => {
	const characters = await fetchData<Character[]>('characters');
	return characters.map(enrichCharacter);
};

export const fetchCharacter = async (name: string, position: Position) =>
	await fetchData<Character>(`characters/${name}/position/${position}`);

export const [CharactersProvider, useCharacters] = createSafeContext('Characters', () => ({
	promise: fetchCharacters(),
	isCharacterRemaining: ({ wasFound }: CharacterUi) => !wasFound,
}));
