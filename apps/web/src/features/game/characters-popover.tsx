import type { CharacterUi, Position } from './types.ts';

import { CircleX } from 'lucide-react';
import { useState } from 'react';

import { PopoverClose, useInvoker } from '#components/ui/index.ts';
import { useTimeout } from '#hooks/timer.ts';

import { fetchCharacter } from './helpers.ts';
import { useScreenShake } from './hooks.ts';

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
	useTimeout(onTimeout, 4500);
	useScreenShake();

	return (
		<p
			className="shadow/10 justify-center-safe mt-1 flex animate-fade-out gap-2 bg-red-500 py-1 font-medium text-red-50 shadow-blue-950"
			role="alert"
		>
			<CircleX />
			Wrong character!
		</p>
	);
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

	const renderCharacter = ({ id, name }: CharacterUi) => (
		<li
			className="border-gray-300 not-last:border-b px-2 py-1 text-gray-700 hover:bg-gray-300 hover:text-gray-800"
			key={id}
		>
			<PopoverClose
				className="w-full cursor-pointer"
				role="menuitem"
				onClick={() => assertCharacter(name, position)}
			>
				{name}
			</PopoverClose>
		</li>
	);

	return (
		<>
			<ul
				id={id}
				className="characters-popover absolute max-h-[50svh] shadow-2xl/25"
				popover="auto"
			>
				{characters.map(renderCharacter)}
			</ul>
			{isCharacter === false && <Toast onTimeout={() => setIsCharacter(undefined)} />}
		</>
	);
};
