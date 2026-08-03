import logo from '#assets/logo.svg';

export const Header = () => (
	<header>
		<a href="/">
			<img src={logo} alt="Where's Shedletsky?" width={256} height={28} />
		</a>
	</header>
);
