import type { AnchorHTMLAttributes } from 'react';

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const ExternalLink = ({ children, ...props }: ExternalLinkProps) => (
	<a target="_blank" rel="noopener noreferrer" {...props}>
		{children}
	</a>
);
