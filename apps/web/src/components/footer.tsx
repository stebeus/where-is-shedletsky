import { ExternalLink, SvgIcon } from './ui/index.ts';

export const Footer = () => (
	<footer className="stack text-center drop-shadow-blue-950 drop-shadow-xs/25">
		<p>
			The game and error pictures were created by{' '}
			<ExternalLink href="https://www.reddit.com/user/yellowt3a/">yellowt3a</ExternalLink> and{' '}
			<ExternalLink href="https://www.reddit.com/user/Stormcloak_Guard_/">
				Stormcloak_Guard_
			</ExternalLink>
			, respectively.
		</p>
		<div className="justify-center-safe flex">
			<p className="separator">
				© Stebeus 2026.{' '}
				<ExternalLink href="https://opensource.org/license/mit">MIT License</ExternalLink>
			</p>
			<ExternalLink className="transition-spin" href="https://github.com/stebeus">
				<SvgIcon title="GitHub" />
			</ExternalLink>
		</div>
	</footer>
);
