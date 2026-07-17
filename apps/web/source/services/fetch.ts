import { env } from '#root/env.ts';

class FetchError extends Error {
	readonly res: Response;

	constructor(url: URL, res: Response) {
		super(`Failed to fetch ${url}`);
		this.res = res;
	}
}

export const fetchResource = async <Data>(
	endpoint: string,
	options?: RequestInit,
): Promise<Data> => {
	const url = new URL(endpoint, `${env.VITE_API_URL}/`);

	const res = await fetch(url, options);
	const resource = await res.json();

	if (!res.ok) throw new FetchError(url, res);

	return resource.data;
};
