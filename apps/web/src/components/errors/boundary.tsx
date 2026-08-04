import { Component, captureOwnerStack, type ErrorInfo, type ReactNode } from 'react';

import { type ErrorFallbackProps, renderErrorFallback } from './fallback.tsx';

type ErrorBoundaryProps = {
	fallback: ReactNode | ((props: ErrorFallbackProps) => ReactNode);
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
