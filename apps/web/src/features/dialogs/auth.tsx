import { type ReactNode, useState } from 'react';

import { userSchema } from '@repo/contracts/users';

import { FormErrors, renderField, renderInput } from '#components/forms/index.ts';
import { type DialogProps, Modal } from '#components/index.ts';
import { Duration, SubmitButton } from '#components/ui/index.ts';
import { useForm } from '#hooks/form.ts';

type AuthProps = Pick<DialogProps, 'ref'> & {
	bestTime: number;
	onAction: () => void;
};

type AuthEndpoint = `sign-${'in' | 'up'}`;

type SubmitButtonProps = {
	endpoint: AuthEndpoint;
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

export const Auth = ({ bestTime, onAction, ref }: AuthProps) => {
	const [endpoint, setEndpoint] = useState<AuthEndpoint>();
	const { error, submit } = useForm(`users/${endpoint}`, onAction, { metadata: { bestTime } });

	const renderSubmitButton = ({ endpoint, children }: SubmitButtonProps) => (
		<SubmitButton onClick={() => setEndpoint(endpoint)} key={endpoint}>
			{children}
		</SubmitButton>
	);

	return (
		<Modal.Root>
			<Modal.Window closedby="none" ref={ref}>
				<form className="contents" onSubmit={submit}>
					<h1>New high score!</h1>
					<p>
						You finished in <Duration milliseconds={bestTime} format={{ style: 'long' }} />.
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
