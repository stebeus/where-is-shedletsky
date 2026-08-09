import type { RenderProps } from '#types/ui.ts';

import { Component, captureOwnerStack, type ErrorInfo, type ReactNode } from 'react';

import errorImage from '#assets/error.webp';
import { FetchError } from '#utils/index.ts';

import { Button } from './ui/index.ts';

type ErrorFallbackProps<ErrorConstructor extends Error = Error> = {
	error: ErrorConstructor;
	reset: () => void;
};

const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => (
	<>
		<h1>Oops - you've reached this page in error</h1>
		<p>
			{FetchError.isFetchError(error) && `${error.status} `}
			{error.message}
		</p>
		<img src={errorImage} alt="Noob poking a bomb with a stick" width={280} height={280} />
		<Button onClick={reset}>Reload</Button>
	</>
);

const renderErrorFallback = (props: ErrorFallbackProps) => <ErrorFallback {...props} />;

type ErrorBoundaryProps = {
	fallback: ReactNode | RenderProps<ErrorFallbackProps>;
	children: ReactNode;
};

type ErrorBoundaryState = {
	error?: Error;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	static defaultProps = { fallback: renderErrorFallback };

	static getDerivedStateFromError(error: Error) {
		return { error };
	}

	state: ErrorBoundaryState = {};

	componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
		console.log(error, componentStack, captureOwnerStack());
	}

	reset = () => this.setState({ error: undefined });

	render() {
		const { error } = this.state;
		const { fallback, children } = this.props;

		if (error == null) return children;
		return typeof fallback === 'function' ? fallback({ error, reset: this.reset }) : fallback;
	}
}
