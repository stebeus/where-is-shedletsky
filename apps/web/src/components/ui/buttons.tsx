import { type ButtonHTMLAttributes, useId } from 'react';

import { createContextProvider } from '#hooks/context.tsx';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ type = 'button', children, ...props }: ButtonProps) => (
	<button type={type} {...props}>
		{children}
	</button>
);

export const [InvokerProvider, useInvokerContext] = createContextProvider(
	() => ({ id: useId() }),
	'Invoker',
);

export const InvokerButton = ({ command, children }: ButtonProps) => {
	const { id } = useInvokerContext();

	return (
		<Button command={command} commandFor={id}>
			{children}
		</Button>
	);
};

export const PopoverTrigger = ({ children }: ButtonProps) => (
	<InvokerButton command="toggle-popover">{children}</InvokerButton>
);

export const SubmitButton = ({ children }: ButtonProps) => (
	<Button type="submit">{children}</Button>
);
