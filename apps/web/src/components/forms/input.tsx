import { type JSX, mergeProps } from 'solid-js';

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
	const merged = mergeProps({ type: 'text' }, props);
	return <input {...merged} />;
};
