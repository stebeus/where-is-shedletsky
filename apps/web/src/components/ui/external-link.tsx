import type { ComponentPropsWithoutRef } from 'react';

type ExternalLinkProps = ComponentPropsWithoutRef<'a'>;

export const ExternalLink = (props: ExternalLinkProps) => (
	<a target="_blank" rel="noopener noreferrer" {...props} />
);
