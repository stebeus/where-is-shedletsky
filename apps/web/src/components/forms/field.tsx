import type { RenderProps } from '#types/ui.ts';

import { useId } from 'react';

import { toCamelCase } from '#utils/formatters.ts';

export type FieldRenderProps = {
	name: string;
	helperTextId?: string;
};

type FieldProps = {
	label: string;
	helperText?: string;
	children: RenderProps<FieldRenderProps>;
};

const Field = ({ label, helperText, children }: FieldProps) => {
	const name = toCamelCase(label);
	const helperTextId = useId();

	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: the children are form controls
		<label className="stack">
			<span className="font-medium text-gray-700">{label}</span>
			{children({ name, helperTextId: helperText == null ? undefined : helperTextId })}
			{helperText != null && (
				<span id={helperTextId} className="text-sm">
					{helperText}
				</span>
			)}
		</label>
	);
};

export const renderField = (props: FieldProps) => <Field {...props} key={crypto.randomUUID()} />;
