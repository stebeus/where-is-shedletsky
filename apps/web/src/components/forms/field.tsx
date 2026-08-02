import type { ComponentChildren, InputHTMLAttributes } from 'preact';

import { useId } from 'preact/hooks';

import { toCamelCase } from '#root/utils/formatters.ts';

type FieldRenderProps = {
	name: string;
	helperTextId?: string;
};

type FieldProps = {
	label: string;
	helperText?: string;
	children: (props: FieldRenderProps) => ComponentChildren;
};

type InputFieldProps = Omit<FieldProps, 'children'> & InputHTMLAttributes;

const hasHelperText = (helperText?: string) => helperText != null;

export const Field = ({ label, helperText, children }: FieldProps) => {
	const name = toCamelCase(label);
	const helperTextId = hasHelperText(helperText) ? useId() : undefined;

	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: the children are form controls
		<label>
			<span>{label}</span>
			{children({ name, helperTextId })}
			{hasHelperText(helperText) && <span id={helperTextId}>{helperText}</span>}
		</label>
	);
};

export const Input = ({ type = 'text', ...props }: InputHTMLAttributes) => (
	<input type={type} {...props} />
);

export const InputField = ({ label, helperText, ...inputProps }: InputFieldProps) => (
	<Field label={label} helperText={helperText}>
		{({ name, helperTextId }) => (
			<Input name={name} aria-describedby={helperTextId} {...inputProps} />
		)}
	</Field>
);
