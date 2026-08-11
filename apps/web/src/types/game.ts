import type { Character } from '@repo/contracts/characters';

export type CharacterState = Character & {
	wasFound: boolean;
};
