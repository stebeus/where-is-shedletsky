import { type Accessor, createSignal } from 'solid-js';

import { catchError } from '@repo/errors';

import {
	access,
	FetchError,
	type Fetcher,
	fetchData,
	fetchInternalData,
	type PseudoAccessor,
} from '#utils/index.ts';

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

type Form = Readonly<{
	error: Accessor<Error | FetchError | undefined>;
	submit: (event: Event) => Promise<void>;
}>;

type FormPrimitive = (
	url: PseudoAccessor<string>,
	onAction: () => void,
	options?: FormOptions,
) => Form;

const isHtmlFormElement = (target: EventTarget) => target instanceof HTMLFormElement;

export const createForm: FormPrimitive = (
	url,
	onAction,
	{ fetcher = fetchData, metadata, method = 'POST' } = {},
) => {
	const [error, setError] = createSignal<Error | FetchError>();

	const submit = async (event: Event) => {
		event.preventDefault();

		const { target } = event;
		if (target == null || !isHtmlFormElement(target)) return;

		const formData = new FormData(target);
		const entries = Object.fromEntries(formData);
		const newEntries = { ...entries, ...metadata };

		const urlAccessor = access(url);

		try {
			await fetcher(urlAccessor, {
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

export const makeInternalForm: FormPrimitive = (url, onAction, options) =>
	createForm(url, onAction, { fetcher: fetchInternalData, ...options });
