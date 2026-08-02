import type { ButtonHTMLAttributes, DialogHTMLAttributes } from 'preact';

import { InvokerButton, InvokerProvider, PopoverTrigger, useInvokerContext } from './ui/index.ts';

const ModalWindow = ({ children, ...props }: DialogHTMLAttributes) => {
	const { id } = useInvokerContext();

	return (
		<dialog id={id} {...props}>
			{children}
		</dialog>
	);
};

const DialogWindow = ({ children }: DialogHTMLAttributes) => (
	<ModalWindow popover>{children}</ModalWindow>
);

const ModalTrigger = ({ children }: ButtonHTMLAttributes) => (
	<InvokerButton command="show-modal">{children}</InvokerButton>
);

const Close = ({ children }: ButtonHTMLAttributes) => (
	<InvokerButton command="close">{children}</InvokerButton>
);

export const Modal = {
	Root: InvokerProvider,
	Window: ModalWindow,
	Trigger: ModalTrigger,
	Close,
};

export const Dialog = {
	Root: InvokerProvider,
	Window: DialogWindow,
	Trigger: PopoverTrigger,
	Close,
};
