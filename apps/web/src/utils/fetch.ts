import { env } from '#env.ts';

export class FetchError<ErrorResponse = unknown> extends Error {
	static isFetchError(value: unknown) {
		return value instanceof FetchError;
	}

	static async from<ErrorResponse>(res: Response) {
		const { statusText, status } = res;

		try {
			const payload = await res.json();
			return new FetchError<ErrorResponse>(statusText, status, payload);
		} catch {
			const message = await res.text();
			return new FetchError<ErrorResponse>(message, status);
		}
	}

	readonly status;
	readonly payload;

	constructor(message: string, status: number, payload?: ErrorResponse) {
		super(message);
		this.status = status;
		this.payload = payload;
	}
}

export const fetchData = async <Data, Error = unknown>(
	url: string,
	options?: RequestInit,
): Promise<Data> => {
	const res = await fetch(url, options);
	if (!res.ok) throw await FetchError.from<Error>(res);

	const result = await res.json();
	return result;
};

export type Fetcher = typeof fetchData;

export const fetchInternalData = async <Data, Error = unknown>(
	endpoint: string,
	options?: RequestInit,
) => {
	type InternalData = {
		data: Data;
	};

	const url = `${env.VITE_API_URL}/${endpoint}`;
	const { data } = await fetchData<InternalData, Error>(url, options);

	return data;
};
