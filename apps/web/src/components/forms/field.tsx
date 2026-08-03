import { type InputHTMLAttributes, type ReactNode, useId } from 'react';

import { toCamelCase } from '#root/utils/formatters.ts';

type FieldRenderProps = {
	name: string;
	helperTextId?: string;
};

type FieldProps = {
	label: string;
	helperText?: string;
	children: (props: FieldRenderProps) => ReactNode;
};

type InputProps = InputHTMLAttributes<HTMLInputElement>;

type InputFieldProps = Omit<FieldProps, 'children'> & InputProps;

const hasHelperText = (helperText?: string) => helperText != null;

export const Field = ({ label, helperText, children }: FieldProps) => {
	const name = toCamelCase(label);
	const helperTextId = useId();

	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: the children are form controls
		<label>
			<span>{label}</span>
			{children({ name, helperTextId: hasHelperText(helperText) ? helperTextId : undefined })}
			{hasHelperText(helperText) && <span id={helperTextId}>{helperText}</span>}
		</label>
	);
};

export const Input = ({ type = 'text', ...props }: InputProps) => <input type={type} {...props} />;

export const InputField = ({ label, helperText, ...inputProps }: InputFieldProps) => (
	<Field label={label} helperText={helperText}>
		{({ name, helperTextId }) => (
			<Input name={name} aria-describedby={helperTextId} {...inputProps} />
		)}
	</Field>
);
