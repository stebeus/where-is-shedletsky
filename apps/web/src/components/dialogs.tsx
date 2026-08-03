import type { DialogHTMLAttributes, Ref } from 'react';

import {
	type ButtonProps,
	InvokerButton,
	InvokerProvider,
	PopoverTrigger,
	useInvokerContext,
} from './ui/index.ts';

type DialogProps = DialogHTMLAttributes<HTMLDialogElement> & {
	ref?: Ref<HTMLDialogElement>;
};

const ModalWindow = ({ children, ...props }: DialogProps) => {
	const { id } = useInvokerContext();

	return (
		<dialog id={id} {...props}>
			{children}
		</dialog>
	);
};

const DialogWindow = ({ children, ...props }: DialogProps) => (
	<ModalWindow popover="auto" {...props}>
		{children}
	</ModalWindow>
);

const ModalTrigger = ({ children }: ButtonProps) => (
	<InvokerButton command="show-modal">{children}</InvokerButton>
);

const Close = ({ children }: ButtonProps) => (
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
