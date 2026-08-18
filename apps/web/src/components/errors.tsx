import type { RenderProps } from '#types/ui.ts';

import { Component, type ErrorInfo, type ReactNode } from 'react';

import errorImage from '#assets/error.webp';
import { FetchError } from '#utils/fetch.ts';

import { Button } from './ui/index.ts';

type ErrorFallbackProps<ErrorConstructor extends Error = Error> = {
	error: ErrorConstructor;
	reset: () => void;
};

type ErrorBoundaryProps = {
	fallback: ReactNode | RenderProps<ErrorFallbackProps>;
	children: ReactNode;
};

type ErrorBoundaryState = {
	error?: Error;
};

const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => (
	<div className="contents not-[dialog>*]:drop-shadow-blue-950 not-[dialog>*]:drop-shadow-xs/25">
		<h1>Oops - you've reached this page in error</h1>
		<p className="text-center">
			{FetchError.isFetchError(error) && `${error.status} `}
			{error.message}
		</p>
		<img
			className="place-self-center-safe border border-gray-300"
			src={errorImage}
			alt="Noob poking a bomb with a stick"
			width={280}
			height={280}
		/>
		<Button onClick={reset}>Reload</Button>
	</div>
);

const renderErrorFallback = (props: ErrorFallbackProps) => <ErrorFallback {...props} />;

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	static defaultProps = { fallback: renderErrorFallback };

	static getDerivedStateFromError(error: Error) {
		return { error };
	}

	state: ErrorBoundaryState = {};

	componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
		console.log(error, componentStack);
	}

	reset = () => this.setState({ error: undefined });

	render() {
		const { error } = this.state;
		const { children, fallback } = this.props;

		if (error == null) return children;
		return typeof fallback === 'function' ? fallback({ error, reset: this.reset }) : fallback;
	}
}
