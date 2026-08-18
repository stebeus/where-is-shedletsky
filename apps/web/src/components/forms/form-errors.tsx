import { getFormErrors } from '#hooks/form.ts';

type FormErrorsProps = {
	error: Error;
};

type FormErrorProps = {
	message: string;
};

const FormError = ({ message }: FormErrorProps) => (
	<li
		className="rounded border border-red-700/25 bg-rose-700/5 px-2 py-1 text-red-700"
		aria-live="assertive"
		role="alert"
	>
		{message}
	</li>
);

const renderFormError = (message: string) => (
	<FormError message={message} key={crypto.randomUUID()} />
);

export const FormErrors = ({ error }: FormErrorsProps) => {
	const errors = getFormErrors(error);
	return <ul className="stack gap-2">{errors.map(renderFormError)}</ul>;
};
