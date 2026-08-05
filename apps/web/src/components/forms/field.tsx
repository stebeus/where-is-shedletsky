import { type Accessor, createUniqueId, type JSX } from 'solid-js';

import { toCamelCase } from '#utils/formatters.ts';

export type FieldRenderProps = {
	name: string;
	helperTextId?: string;
};

type FieldProps = {
	label: string;
	helperText?: string;
	children: (props: FieldRenderProps) => JSX.Element;
};

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

export const renderField = (props: Accessor<FieldProps>) => <Field {...props()} />;
