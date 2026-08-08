import type { Accessor } from 'solid-js';

export type PseudoAccessor<Type = unknown> = Type | Accessor<Type>;

export const access = <Type extends PseudoAccessor>(value: Type) =>
	typeof value === 'function' ? value() : value;
