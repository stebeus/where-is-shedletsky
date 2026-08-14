import { type ComponentPropsWithoutRef, useId } from 'react';

import { createSafeContext } from '#hooks/context.tsx';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export const Button = ({ type = 'button', ...props }: ButtonProps) => (
	<button type={type} {...props} />
);

export const [InvokerProvider, useInvoker] = createSafeContext('Invoker', () => ({ id: useId() }));

export const InvokerButton = (props: ButtonProps) => {
	const { id } = useInvoker();
	return <Button commandFor={id} {...props} />;
};

export const PopoverTrigger = (props: ButtonProps) => (
	<InvokerButton command="toggle-popover" {...props} />
);

export const PopoverClose = (props: ButtonProps) => (
	<InvokerButton command="hide-popover" {...props} />
);

export const SubmitButton = (props: ButtonProps) => <Button type="submit" {...props} />;
