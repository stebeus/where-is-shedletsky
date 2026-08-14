import type { Character } from '@repo/contracts/characters';

export type CharacterUi = Readonly<Character & { wasFound: boolean }>;

export type Position = `${number},${number}`;
