import { type SubmitEvent, useState } from 'react';

import { catchError } from '@repo/errors';

import { FetchError, type Fetcher, fetchData, fetchInternalData } from '#utils/index.ts';

type HttpMethod =
	| 'GET'
	| 'HEAD'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'CONNECT'
	| 'OPTIONS'
	| 'TRACE'
	| 'PATCH';

type FormOptions = Partial<{
	fetcher: Fetcher;
	metadata: Record<string, unknown>;
	method: HttpMethod;
}>;

type FieldErrors = [string, ...string[]];

type FormErrorResponse = Readonly<{
	formErrors: string[];
	fieldErrors: Record<string, FieldErrors>;
}>;

export type FormError = FetchError<FormErrorResponse>;

type Form = Readonly<{
	error?: Error | FormError;
	submit: (event: SubmitEvent) => Promise<void>;
}>;

type FormHook = (url: string, onAction: () => void, options?: FormOptions) => Form;

export const getFormErrors = (error: Error | FormError) => {
	console.log(error);

	const isFormError = (error: unknown): error is FormError =>
		FetchError.isFetchError(error) && error.status === 400;

	const getFieldError = ([message]: FieldErrors) => message;

	return isFormError(error) && error.payload?.fieldErrors != null
		? Object.values(error.payload.fieldErrors).map(getFieldError)
		: [error.message];
};

const isHtmlFormElement = (target: EventTarget) => target instanceof HTMLFormElement;

export const useForm: FormHook = (
	url,
	onAction,
	{ fetcher = fetchData, metadata, method = 'POST' } = {},
) => {
	const [error, setError] = useState<Error | FormError>();

	const submit = async (event: SubmitEvent) => {
		event.preventDefault();

		const { target } = event;
		if (target == null || !isHtmlFormElement(target)) return;

		const formData = new FormData(target);
		const entries = Object.fromEntries(formData);
		const newEntries = { ...entries, ...metadata };

		try {
			await fetcher(url, {
				method,
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(newEntries),
			});

			target.reset();
			onAction();
		} catch (error) {
			const caught = FetchError.isFetchError(error) ? error : catchError(error);
			setError(caught);
		}
	};

	return { error, submit } as const;
};

export const useInternalForm: FormHook = (url, onAction, options) =>
	useForm(url, onAction, { fetcher: fetchInternalData, ...options });
