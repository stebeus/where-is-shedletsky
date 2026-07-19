import { env } from '#root/env.ts';

export class HttpException extends Error {
	static isInstance = (value: unknown) => value instanceof HttpException;

	readonly status;
	readonly #res;

	constructor(res: Response) {
		super(res.statusText);
		this.status = res.status;
		this.#res = res;
	}

	async json() {
		return await this.#res.json();
	}
}

export const fetchResource = async <Data>(
	endpoint: string,
	options?: RequestInit,
): Promise<Data> => {
	const url = new URL(endpoint, `${env.VITE_API_URL}/`);

	const res = await fetch(url, options);
	const resource = await res.json();

	if (!res.ok) throw new HttpException(res);

	return resource.data;
};
