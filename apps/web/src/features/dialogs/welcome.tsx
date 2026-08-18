import type { Character } from '@repo/contracts/characters';

import { useEffect, useRef } from 'react';

import { type DialogProps, Modal } from '#components/index.ts';
import { Shortcut } from '#components/ui/index.ts';
import { env } from '#env.ts';

type WelcomeProps = Pick<DialogProps, 'onClose'> & {
	characters: Character[];
};

export const Welcome = ({ characters, onClose }: WelcomeProps) => {
	const welcomeRef = useRef<HTMLDialogElement>(null);

	useEffect(() => welcomeRef.current?.showModal(), []);

	return (
		<Modal.Root>
			<Modal.Window closedby="any" onClose={onClose} ref={welcomeRef}>
				<h1>Welcome to {env.VITE_APP_NAME}</h1>
				<p>
					Be the quickest player to find all {characters.length} Roblox characters, by clicking on
					their eyes and then selecting their names correctly.
				</p>
				<p>
					You can also press <Shortcut>Tab</Shortcut> to get to each character quickly.
				</p>
				<Modal.Close>Play now</Modal.Close>
			</Modal.Window>
		</Modal.Root>
	);
};
