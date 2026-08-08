import type { JSX } from 'solid-js';

export type RenderProps<Props> = (props: Props) => JSX.Element;
