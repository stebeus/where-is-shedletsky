import { type ReactNode, type RefObject, useState } from 'react';

import { userSchema } from '@repo/contracts/users';

import { FormErrors, renderField, renderInput } from '#components/forms/index.ts';
import { Modal } from '#components/index.ts';
import { SubmitButton } from '#components/ui/index.ts';
import { useInternalForm } from '#hooks/index.ts';

type AuthProps = {
	bestTime: number;
	ref: RefObject<HTMLDialogElement | null>;
	onAction: () => void;
};

type Endpoint = `sign-${'in' | 'up'}`;

type SubmitButtonProps = {
	endpoint: Endpoint;
	children: ReactNode;
};

const { username, password } = userSchema.shape;

const fields = [
	{
		label: 'Username',
		children: renderInput({
			autoComplete: 'username',
			pattern: '\\w+',
			placeholder: 'john_doe123',
			maxLength: username.maxLength as number,
			required: true,
		}),
	},
	{
		label: 'Password',
		helperText: `Password must be at least ${password.minLength} characters long`,
		children: renderInput({
			autoComplete: 'new-password',
			minLength: password.minLength as number,
			maxLength: 100,
			required: true,
		}),
	},
];

const submitButtons: SubmitButtonProps[] = [
	{ endpoint: 'sign-in', children: 'Log in' },
	{ endpoint: 'sign-up', children: 'Register' },
];

export const Auth = ({ bestTime, ref, onAction }: AuthProps) => {
	const [endpoint, setEndpoint] = useState<Endpoint>();

	const { error, submit } = useInternalForm(`users/${endpoint}`, onAction, {
		metadata: { bestTime },
	});

	const renderSubmitButton = ({ endpoint, children }: SubmitButtonProps) => (
		<SubmitButton key={crypto.randomUUID()} onClick={() => setEndpoint(endpoint)}>
			{children}
		</SubmitButton>
	);

	return (
		<Modal.Root>
			<Modal.Trigger>TEST</Modal.Trigger>
			<Modal.Window ref={ref}>
				<form onSubmit={submit}>
					<h1>New high score!</h1>
					<p>
						You finished in <time dateTime={bestTime.toString()}>{bestTime}</time>.
					</p>
					<p>Log in or register to save your score:</p>
					{error != null && <FormErrors error={error} />}
					{fields.map(renderField)}
					{submitButtons.map(renderSubmitButton)}
				</form>
			</Modal.Window>
		</Modal.Root>
	);
};
