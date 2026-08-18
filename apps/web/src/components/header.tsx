import logo from '#assets/logo.svg';

const Logo = () => (
	<img
		className="w-[clamp(256px,50svw,526px)] drop-shadow-blue-950 drop-shadow-xs/25"
		src={logo}
		alt="Where's Shedletsky?"
		width={256}
		height={28}
	/>
);

export const Header = () => (
	<header>
		<a href="/">
			<Logo />
		</a>
	</header>
);
