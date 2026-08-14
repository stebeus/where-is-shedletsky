import type { ComponentProps } from 'react';

import {
	type ButtonProps,
	InvokerButton,
	InvokerProvider,
	PopoverClose,
	PopoverTrigger,
	useInvoker,
} from './ui/index.ts';

export type DialogProps = ComponentProps<'dialog'>;

const ModalWindow = (props: DialogProps) => {
	const { id } = useInvoker();
	return <dialog id={id} {...props} />;
};

const DialogWindow = (props: DialogProps) => <ModalWindow popover="auto" {...props} />;

const ModalTrigger = ({ children }: ButtonProps) => (
	<InvokerButton command="show-modal">{children}</InvokerButton>
);

const ModalClose = ({ children }: ButtonProps) => (
	<InvokerButton command="close">{children}</InvokerButton>
);

export const Modal = {
	Root: InvokerProvider,
	Window: ModalWindow,
	Trigger: ModalTrigger,
	Close: ModalClose,
};

export const Dialog = {
	Root: InvokerProvider,
	Window: DialogWindow,
	Trigger: PopoverTrigger,
	Close: PopoverClose,
};
