import type { ButtonHTMLAttributes } from 'preact';

import { useId } from 'preact/hooks';

import { createContextProvider } from '#root/hooks/context.tsx';

export const Button = ({ type = 'button', children, ...props }: ButtonHTMLAttributes) => (
	<button type={type} {...props}>
		{children}
	</button>
);

export const [InvokerProvider, useInvokerContext] = createContextProvider(
	() => ({ id: useId() }),
	'Invoker',
);

export const InvokerButton = ({ command, children }: ButtonHTMLAttributes) => {
	const { id } = useInvokerContext();

	return (
		<Button command={command} commandFor={id}>
			{children}
		</Button>
	);
};

export const PopoverTrigger = ({ children }: ButtonHTMLAttributes) => (
	<InvokerButton command="toggle-popover">{children}</InvokerButton>
);

export const SubmitButton = ({ children }: ButtonHTMLAttributes) => (
	<Button type="submit">{children}</Button>
);
