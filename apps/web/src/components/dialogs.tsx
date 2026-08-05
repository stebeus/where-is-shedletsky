import type { JSX } from 'solid-js';

import {
	type ButtonProps,
	InvokerButton,
	InvokerProvider,
	PopoverTrigger,
	useInvoker,
} from './ui/index.ts';

type DialogProps = JSX.DialogHtmlAttributes<HTMLDialogElement>;

const ModalWindow = (props: DialogProps) => {
	const { id } = useInvoker();

	return (
		<dialog id={id} {...props}>
			{props.children}
		</dialog>
	);
};

const DialogWindow = (props: DialogProps) => (
	<ModalWindow popover="auto" {...props}>
		{props.children}
	</ModalWindow>
);

const ModalTrigger = (props: ButtonProps) => (
	<InvokerButton command="show-modal">{props.children}</InvokerButton>
);

const ModalClose = (props: ButtonProps) => (
	<InvokerButton command="close">{props.children}</InvokerButton>
);

const DialogClose = (props: ButtonProps) => (
	<InvokerButton command="hide-popover">{props.children}</InvokerButton>
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
	Close: DialogClose,
};
