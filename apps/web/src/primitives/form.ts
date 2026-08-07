import { createSignal } from 'solid-js';

import { FetchError, fetchData } from '#utils/index.ts';

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
	fetcher: typeof fetchData;
	method: HttpMethod;
	payload: Record<string, unknown>;
}>;

const isHtmlFormElement = (target: EventTarget) => target instanceof HTMLFormElement;

export const createForm = (
	url: any,
	onAction: () => void,
	{ fetcher = fetchData, method = 'POST', payload }: FormOptions = {},
) => {
	const [error, setError] = createSignal<any>();

	const submit = async (event: Event) => {
		event.preventDefault();

		const { target } = event;
		if (target == null || !isHtmlFormElement(target)) return;

		const formData = new FormData(target);
		const entries = Object.fromEntries(formData);
		const newEntries = JSON.stringify({ ...entries, ...payload });

		try {
			await fetcher(url(), { method, body: newEntries });
			target.reset();
			onAction();
		} catch (error) {
			if (!FetchError.isInstance(error)) return;
			const payload = await error.toJson();
			setError(payload);
		}
	};

	return { error, submit };
};
