import type { AnchorHTMLAttributes } from 'react';

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const ExternalLink = ({ href, children }: ExternalLinkProps) => (
	<a href={href} target="_blank" rel="noopener noreferrer">
		{children}
	</a>
);
