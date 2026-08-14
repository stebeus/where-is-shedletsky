import { Dialog, type DialogProps } from '#components/index.ts';

type SuccessProps = Pick<DialogProps, 'ref'>;

export const Success = ({ ref }: SuccessProps) => (
	<Dialog.Root>
		<Dialog.Window ref={ref}>
			<h1>Success!</h1>
			<p>You can now check your score in the leaderboard or restart the game.</p>
			<Dialog.Close>OK</Dialog.Close>
		</Dialog.Window>
	</Dialog.Root>
);
