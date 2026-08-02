import type { AnchorHTMLAttributes } from 'preact';

export const ExternalLink = ({ href, children }: AnchorHTMLAttributes) => (
	<a href={href} target="_blank" rel="noopener noreferrer">
		{children}
	</a>
);
