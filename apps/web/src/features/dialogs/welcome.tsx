import { type DialogHTMLAttributes, useEffect, useRef } from 'react';

import { Modal } from '#components/index.ts';
import { env } from '#env.ts';

type WelcomeProps = Pick<DialogHTMLAttributes<HTMLDialogElement>, 'onClose'>;

export const Welcome = ({ onClose }: WelcomeProps) => {
	const welcomeRef = useRef<HTMLDialogElement>(null);

	useEffect(() => welcomeRef.current?.showModal(), []);

	return (
		<Modal.Root>
			<Modal.Window closedby="any" ref={welcomeRef} onClose={onClose}>
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
