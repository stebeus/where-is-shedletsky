import { Dialog } from '#components/index.ts';

export const Success = () => (
	<Dialog.Root>
		<Dialog.Window>
			<h1>Success!</h1>
			<p>You can now check your score in the leaderboard or restart the game.</p>
			<Dialog.Close>OK</Dialog.Close>
		</Dialog.Window>
	</Dialog.Root>
);
