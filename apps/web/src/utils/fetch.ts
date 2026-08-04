import { env } from '#env.ts';

export class FetchError extends Error {
	static isInstance(value: unknown) {
		return value instanceof FetchError;
	}

	readonly status;
	readonly #res;

	constructor(res: Response) {
		super(res.statusText);
		this.status = res.status;
		this.#res = res;
	}

	async toJson() {
		return await this.#res.json();
	}
}

export const fetchData = async <Data>(url: string, options?: RequestInit): Promise<Data> => {
	const res = await fetch(url, options);
	if (!res.ok) throw new FetchError(res);

	const result = await res.json();
	return result;
};

export const fetchInternalData = async <Data>(endpoint: string, options?: RequestInit) => {
	type Result = {
		data: Data;
	};

	const url = `${env.VITE_API_URL}/${endpoint}`;
	const { data } = await fetchData<Result>(url, options);

	return data;
};
