import errorImage from '#assets/error.webp';
import { Button } from '#components/ui/index.ts';
import { FetchError } from '#utils/index.ts';

export type ErrorFallbackProps<ErrorConstructor extends Error = Error> = {
	error: ErrorConstructor;
	reset: () => void;
};

const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => (
	<>
		<h2>Oops - you've reached this page in error</h2>
		<p>
			{FetchError.isInstance(error) && `${error.status} `} {error.message}
		</p>
		<img src={errorImage} alt="Noob poking a bomb with a stick" width={280} height={280} />
		<Button onClick={reset}>Reload</Button>
	</>
);

export const renderErrorFallback = (props: ErrorFallbackProps) => <ErrorFallback {...props} />;
