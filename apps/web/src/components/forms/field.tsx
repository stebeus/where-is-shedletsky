import { createUniqueId, type JSX, splitProps } from 'solid-js';

import { toCamelCase } from '#utils/formatters.ts';

import { Input, type InputProps } from './input.ts';

type FieldRenderProps = {
	name: string;
	helperTextId?: string;
};

type FieldProps = {
	label: string;
	helperText?: string;
	children: (props: FieldRenderProps) => JSX.Element;
};

type FieldPropParams = Omit<FieldProps, 'children'>;

type InputField = FieldPropParams & InputProps;

const Field = (props: FieldProps) => {
	const name = toCamelCase(props.label);
	const helperTextId = props.helperText == null ? undefined : createUniqueId();

	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: the children are form controls
		<label>
			<span>{props.label}</span>
			{props.children({ name, helperTextId })}
			{props.helperText != null && <span id={helperTextId}>{props.helperText}</span>}
		</label>
	);
};

export const InputField = (props: InputField) => {
	const [local, rest] = splitProps(props, ['label', 'helperText']);

	return (
		<Field label={local.label} helperText={local.helperText}>
			{(props) => <Input name={props.name} aria-describedby={props.helperTextId} {...rest} />}
		</Field>
	);
};
