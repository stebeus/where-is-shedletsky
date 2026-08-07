import { For } from 'solid-js';

import { InvokerButton, useInvoker } from '#components/ui/index.ts';
import { fetchInternalData } from '#utils/index.ts';

export const CharactersPopover = (props: any) => {
	const { id } = useInvoker();

	const assertCharacter = async (props: any) => {
		const isCharacter = await fetchInternalData(
			`characters/${props.name}/position/${props.position}`,
		);

		if (isCharacter == null) return alert('Wrong character!');

		const updateCharacters = (character: any) =>
			character.name === props.name && isCharacter ? { ...character, wasFound: true } : character;

		props.charactersSetter(props.characters.map(updateCharacters));
	};

	const renderCharacter = (props: any) => (
		<li>
			<InvokerButton command="hide-popover" role="menuitem" onClick={() => assertCharacter(props)}>
				{props.name}
			</InvokerButton>
		</li>
	);

	return (
		<ul id={id} popover="auto">
			<For each={props.characters}>{renderCharacter}</For>
		</ul>
	);
};
