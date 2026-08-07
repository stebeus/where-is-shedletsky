import { onMount } from 'solid-js';

import { Modal } from '#components/index.ts';
import { env } from '#env.ts';

export const Welcome = () => {
	let welcomeRef!: HTMLDialogElement;

	onMount(() => welcomeRef.showModal());

	return (
		<Modal.Root>
			<Modal.Window closedby="any" ref={welcomeRef}>
				<h1>Welcome to {env.VITE_APP_NAME}</h1>
				<p>
					Be the quickest player to find all Roblox characters, by clicking on their eyes and then
					selecting their names correctly.
				</p>
				<p>
					You can also press <kbd>Tab</kbd> to get to each character quickly.
				</p>
				<Modal.Close>Play now</Modal.Close>
			</Modal.Window>
		</Modal.Root>
	);
};
