import type { ComponentPropsWithoutRef } from 'react';
import type { FieldRenderProps } from './field.tsx';

type InputProps = ComponentPropsWithoutRef<'input'>;

export const Input = ({ type = 'text', ...props }: InputProps) => <input type={type} {...props} />;

export const renderInput =
	(inputProps: InputProps) =>
	({ name, helperTextId }: FieldRenderProps) => (
		<Input name={name} aria-describedby={helperTextId} {...inputProps} />
	);
