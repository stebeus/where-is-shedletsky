import type { CharacterState } from '#types/game.ts';

import { PopoverClose, useInvoker } from '#components/ui/index.ts';
import { fetchInternalData } from '#utils/index.ts';

type CharactersPopoverProps = {
	characters: CharacterState[];
	position: `${number},${number}`;
	charactersSetter: any;
};

export const CharactersPopover = ({
	characters = [],
	position,
	charactersSetter,
}: CharactersPopoverProps) => {
	const { id } = useInvoker();

	const assertCharacter = async (name: string, position: string) => {
		const character = await fetchInternalData(`characters/${name}/position/${position}`);
		if (character == null) return alert('Wrong character!');

		const updateCharacter = (character: CharacterState) =>
			character.name === name && !character.wasFound && character != null
				? { ...character, wasFound: true }
				: character;

		charactersSetter((prev: CharacterState[]) => prev.map(updateCharacter));
	};

	const renderCharacter = ({ name }: CharacterState) => (
		<li key={crypto.randomUUID()}>
			<PopoverClose role="menuitem" onClick={() => assertCharacter(name, position)}>
				{name}
			</PopoverClose>
		</li>
	);

	return (
		<ul id={id} popover="auto">
			{characters.map(renderCharacter)}
		</ul>
	);
};
