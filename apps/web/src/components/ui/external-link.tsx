import type { JSX } from 'solid-js';

type ExternalLinkProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

export const ExternalLink = (props: ExternalLinkProps) => (
	<a target="_blank" rel="noopener noreferrer" {...props}>
		{props.children}
	</a>
);
