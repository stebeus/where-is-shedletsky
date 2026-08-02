import { type ComponentChildren, createContext } from 'preact';
import { useContext } from 'preact/hooks';

type ContextProviderProps = Record<string, unknown> & {
	children: ComponentChildren;
};

export const createContextProvider = <Props extends ContextProviderProps, ContextValue>(
	valueFactory: (props: Props) => ContextValue,
	name: Capitalize<string>,
	defaultValue?: ContextValue,
) => {
	const Context = createContext(defaultValue);

	const Provider = (props: Props) => {
		const value = valueFactory(props);
		return <Context.Provider value={value}>{props.children}</Context.Provider>;
	};

	const useSafeContext = () => {
		const safeContext = useContext(Context);
		if (safeContext == null) throw new Error(`${name}Context is missing`);
		return safeContext;
	};

	return [Provider, useSafeContext] as const;
};
