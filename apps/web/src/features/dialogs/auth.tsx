import { createSignal, Index } from 'solid-js';

import { userSchema } from '@repo/contracts/users';

import { renderField, renderInput } from '#components/forms/index.ts';
import { Modal } from '#components/index.ts';
import { SubmitButton } from '#components/ui/buttons.tsx';
import { createForm } from '#primitives/form.ts';
import { fetchInternalData } from '#utils/fetch.ts';

type AuthProps = {
	bestTime: number;
	onAction: () => void;
};

const { username, password } = userSchema.shape;

const fields = [
	{
		label: 'Username',
		children: renderInput({
			// autocomplete: 'username',
			// pattern: '\\w+',
			// placeholder: 'john_doe123',
			// maxLength: username.maxLength as number,
			required: true,
		}),
	},
	{
		label: 'Password',
		helperText: `Password must be at least ${password.minLength} characters long`,
		children: renderInput({
			// autocomplete: 'new-password',
			// minLength: password.minLength as number,
			// maxLength: 100,
			required: true,
		}),
	},
];

export const Auth = (props: AuthProps) => {
	const [endpoint, setEndpoint] = createSignal('');

	const { error, submit } = createForm(() => `users/sign-${endpoint()}`, props.onAction, {
		fetcher: fetchInternalData,
		payload: { bestTime: props.bestTime },
	});

	return (
		<Modal.Root>
			<Modal.Trigger>TEMPORARY REMOVE ME</Modal.Trigger>
			<Modal.Window closedby="any">
				<form onSubmit={submit}>
					<h1>New high score!</h1>
					<p>You finished in {props.bestTime}.</p>
					<p>Log in or register to save your score:</p>
					<p>{JSON.stringify(error)}</p>
					<Index each={fields}>{renderField}</Index>
					<SubmitButton
						onClick={() => {
							setEndpoint('in');
							console.log(endpoint());
						}}
					>
						Log in
					</SubmitButton>
					<SubmitButton
						onClick={() => {
							setEndpoint('up');
							console.log(endpoint());
						}}
					>
						Register
					</SubmitButton>
				</form>
			</Modal.Window>
		</Modal.Root>
	);
};
