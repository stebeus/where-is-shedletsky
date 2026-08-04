import { Component, captureOwnerStack, type ErrorInfo, type ReactNode } from 'react';

type FallbackRenderer = (error: Error, reset: () => void) => ReactNode;

type ErrorBoundaryProps = {
	fallback: ReactNode | FallbackRenderer;
	children: ReactNode;
};

type ErrorBoundaryState = {
	error?: Error;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	static getDerivedStateFromError(error: Error) {
		return { error };
	}

	state: ErrorBoundaryState = {};

	componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
		console.log(error, componentStack, captureOwnerStack());
	}

	reset() {
		return this.setState({});
	}

	render() {
		const { error } = this.state;
		const { fallback, children } = this.props;

		if (error == null) return children;
		return typeof fallback === 'function' ? fallback(error, this.reset) : fallback;
	}
}
