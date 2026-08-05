import { createContext, type JSX, useContext } from 'solid-js';

type ProviderProps = Record<string, unknown> & {
	children?: JSX.Element;
};

export const createSafeContext = <ContextValue, Props extends ProviderProps>(
	name: Capitalize<string>,
	valueFactory: (props: Props) => ContextValue,
) => {
	const Context = createContext<ContextValue>();

	const Provider = (props: Props & { children: JSX.Element }) => (
		<Context.Provider value={valueFactory(props)}>{props.children}</Context.Provider>
	);

	const useSafeContext = () => {
		const SafeContext = useContext(Context);

		if (SafeContext == null) {
			throw new Error(`${name}Context must be used within a <${name}Provider>`);
		}

		return SafeContext;
	};

	return [Provider, useSafeContext] as const;
};
