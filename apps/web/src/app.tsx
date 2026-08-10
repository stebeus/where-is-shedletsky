import { useRef, useState } from 'react';

import { Footer, Header } from './components/index.ts';
import { Auth, Leaderboard, Success, Welcome } from './features/dialogs/index.ts';
import { useTimer } from './hooks/index.ts';

export const App = () => {
	const [canTick, setCanTick] = useState(false);
	const [timer, setTimer] = useState(0);

	const authRef = useRef<HTMLDialogElement>(null);
	const successRef = useRef<HTMLDialogElement>(null);

	const openSuccess = () => {
		authRef.current?.close();
		successRef.current?.showPopover();
	};

	const timeout = canTick ? 10 : undefined;
	useTimer(setInterval, () => setTimer(timer + 1), timeout);

	return (
		<>
			<Header />
			<main>
				<p>{timer}</p>
				<Leaderboard />
			</main>
			<Footer />
			<Welcome onClose={() => setCanTick(true)} />
			<Auth bestTime={timer} ref={authRef} onAction={openSuccess} />
			<Success ref={successRef} />
		</>
	);
};
