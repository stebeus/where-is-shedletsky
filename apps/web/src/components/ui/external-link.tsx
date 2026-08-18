import type { ComponentPropsWithoutRef } from 'react';

type ExternalLinkProps = ComponentPropsWithoutRef<'a'>;

export const ExternalLink = (props: ExternalLinkProps) => (
	<a
		className="underline decoration-1 decoration-gray-50/50 underline-offset-2 hover:no-underline"
		target="_blank"
		rel="noopener noreferrer"
		{...props}
	/>
);
