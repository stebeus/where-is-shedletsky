import { getFormErrors } from '#hooks/form.ts';

type FormErrorsProps = {
	error: Error;
};

const renderFormError = (message: string) => <li key={crypto.randomUUID()}>{message}</li>;

export const FormErrors = ({ error }: FormErrorsProps) => {
	const errors = getFormErrors(error);
	return <ul>{errors.map(renderFormError)}</ul>;
};
