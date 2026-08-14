import type { CharacterUi, Position } from './types.ts';

import { useState } from 'react';

import { PopoverClose, useInvoker } from '#components/ui/index.ts';
import { useTimeout } from '#hooks/timer.ts';

import { fetchCharacter } from './helpers.ts';

type ToastProps = {
	onTimeout: () => void;
};

type CharactersPopoverProps = {
	characters: CharacterUi[];
	position: Position;
	charactersSetter: (
		characters: CharacterUi[] | ((previous: CharacterUi[]) => CharacterUi[]),
	) => void;
};

const Toast = ({ onTimeout }: ToastProps) => {
	useTimeout(onTimeout, 3000);
	return <p role="alert">Wrong character</p>;
};

export const CharactersPopover = ({
	characters = [],
	position,
	charactersSetter,
}: CharactersPopoverProps) => {
	const { id } = useInvoker();
	const [isCharacter, setIsCharacter] = useState<boolean>();

	const assertCharacter = async (name: string, position: Position) => {
		const character = await fetchCharacter(name, position);
		if (character == null) return setIsCharacter(false);

		setIsCharacter(true);

		const updateCharacter = (character: CharacterUi) =>
			character.name === name ? { ...character, wasFound: true } : character;

		const updateCharacters = (previous: CharacterUi[]) => previous.map(updateCharacter);
		charactersSetter(updateCharacters);
	};

	const renderCharacter = ({ name }: CharacterUi) => (
		<li key={crypto.randomUUID()}>
			<PopoverClose role="menuitem" onClick={() => assertCharacter(name, position)}>
				{name}
			</PopoverClose>
		</li>
	);

	return (
		<>
			<ul id={id} popover="auto">
				{characters.map(renderCharacter)}
			</ul>
			{isCharacter === false && <Toast onTimeout={() => setIsCharacter(undefined)} />}
		</>
	);
};
