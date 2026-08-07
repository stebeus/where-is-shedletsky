import errorImage from '#assets/error.webp';
import { FetchError } from '#utils/index.ts';

import { Button } from './ui/index.ts';

type ErrorFallbackProps<ErrorConstructor extends Error = Error> = {
	error: ErrorConstructor;
	reset: () => void;
};

const ErrorFallback = (props: ErrorFallbackProps) => {
	console.log(props.error);

	return (
		<>
			<h1>Oops - you've reached this page in error</h1>
			<p>
				{FetchError.isInstance(props.error) && `${props.error.status} `}
				{props.error.message}
			</p>
			<img src={errorImage} alt="Noob poking a bomb with a stick" width={280} height={280} />
			<Button onClick={props.reset}>Reload</Button>
		</>
	);
};

export const renderErrorFallback = <ErrorConstructor extends Error = Error>(
	error: ErrorConstructor,
	reset: () => void,
) => <ErrorFallback error={error} reset={reset} />;
