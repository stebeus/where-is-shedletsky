import type { FetchError } from '#services/fetch.ts';

import errorImage from '#assets/error.webp';
import { Button } from '#components/ui/index.ts';

type ErrorFallbackProps = {
	error: FetchError;
	reset: () => void;
};

export const ErrorFallback = ({ error: { status, message }, reset }: ErrorFallbackProps) => (
	<>
		<h2>Oops - you've reached this page in error</h2>
		<p>
			{status} {message}
		</p>
		<img src={errorImage} alt="Noob poking a bomb with a stick" width={280} height={280} />
		<Button onClick={reset}>Reload</Button>
	</>
);
