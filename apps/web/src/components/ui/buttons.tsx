import { type ButtonHTMLAttributes, useId } from 'react';

import { createSafeContext } from '#hooks/index.ts';

type StandardCommand =
	| 'show-modal'
	| 'close'
	| 'request-close'
	| 'show-popover'
	| 'hide-popover'
	| 'toggle-popover';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	Partial<{
		commandFor: string;
		command: StandardCommand | `--${string}`;
	}>;

export const Button = ({ type = 'button', children, ...props }: ButtonProps) => (
	<button type={type} {...props}>
		{children}
	</button>
);

export const [InvokerProvider, useInvoker] = createSafeContext('Invoker', () => ({ id: useId() }));

export const InvokerButton = ({ children, ...props }: ButtonProps) => {
	const { id } = useInvoker();

	return (
		<Button commandFor={id} {...props}>
			{children}
		</Button>
	);
};

export const PopoverTrigger = ({ children }: ButtonProps) => (
	<InvokerButton command="toggle-popover">{children}</InvokerButton>
);

export const PopoverClose = ({ children }: ButtonProps) => (
	<InvokerButton command="hide-popover">{children}</InvokerButton>
);

export const SubmitButton = ({ children, onClick }: ButtonProps) => (
	<Button type="submit" onClick={onClick}>
		{children}
	</Button>
);
