import { ExternalLink, SvgIcon } from './ui/index.ts';

export const Footer = () => (
	<footer>
		<p>
			The game and error pictures were created by{' '}
			<ExternalLink href="https://www.reddit.com/user/yellowt3a/">yellowt3a</ExternalLink> and{' '}
			<ExternalLink href="https://www.reddit.com/user/Stormcloak_Guard_/">
				Stormcloak_Guard_
			</ExternalLink>
			, respectively.
		</p>
		<p>
			© Stebeus 2026.{' '}
			<ExternalLink href="https://opensource.org/license/mit">MIT License</ExternalLink>
		</p>
		<ExternalLink href="https://github.com/stebeus">
			<SvgIcon title="GitHub" />
		</ExternalLink>{' '}
	</footer>
);
