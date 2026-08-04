import { createContext, type ReactNode, use } from 'react';

type ProviderProps = Record<string, unknown> & {
	children: ReactNode;
};

export const createContextProvider = <Props extends ProviderProps, ContextValue>(
	valueFactory: (props: Props) => ContextValue,
	name: Capitalize<string>,
	defaultValue?: ContextValue,
) => {
	const Context = createContext(defaultValue);

	const Provider = (props: Props) => (
		<Context value={valueFactory(props)}>{props.children}</Context>
	);

	const useSafeContext = () => {
		const safeContext = use(Context);
		if (safeContext == null) throw new Error(`${name}Context is missing`);
		return safeContext;
	};

	return [Provider, useSafeContext] as const;
};
