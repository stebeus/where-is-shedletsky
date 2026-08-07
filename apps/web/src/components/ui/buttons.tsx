import { createUniqueId, type JSX, mergeProps } from 'solid-js';

import { createSafeContext } from '#primitives/context.tsx';

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
	const merged = mergeProps({ type: 'button' as const }, props);
	return <button {...merged}>{merged.children}</button>;
};

export const [InvokerProvider, useInvoker] = createSafeContext('Invoker', () => ({
	id: createUniqueId(),
}));

export const InvokerButton = (props: ButtonProps) => {
	const { id } = useInvoker();

	return (
		<Button commandfor={id} {...props}>
			{props.children}
		</Button>
	);
};

export const PopoverTrigger = (props: ButtonProps) => (
	<InvokerButton command="toggle-popover">{props.children}</InvokerButton>
);

export const SubmitButton = (props: ButtonProps) => (
	<Button type="submit" onClick={props.onClick}>
		{props.children}
	</Button>
);
