import { createContext, type ReactNode, use } from 'react';

type ProviderProps = Record<string, unknown> & {
	children: ReactNode;
};

export const createSafeContext = <Props extends ProviderProps, ContextValue>(
	valueFactory: (props: Props) => ContextValue,
	name: Capitalize<string>,
) => {
	const Context = createContext<ContextValue | undefined>(undefined);

	const Provider = (props: Props) => (
		<Context value={valueFactory(props)}>{props.children}</Context>
	);

	const useSafeContext = () => {
		const safeContext = use(Context);

		if (safeContext == null) {
			throw new Error(`${name}Context must be used within a <${name}Provider>`);
		}

		return safeContext;
	};

	return [Provider, useSafeContext] as const;
};
