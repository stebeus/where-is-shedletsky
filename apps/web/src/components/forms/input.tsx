import type { FieldRenderProps } from './field.tsx';

import { type JSX, mergeProps } from 'solid-js';

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
	const merged = mergeProps({ type: 'text' }, props);
	return <input {...merged} />;
};

export const renderInput = (inputProps: InputProps) => (fieldProps: FieldRenderProps) => (
	<Input name={fieldProps.name} aria-describedby={fieldProps.helperTextId} {...inputProps} />
);
