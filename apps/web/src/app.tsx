import { Suspense, use, useRef, useState } from 'react';

import { ErrorBoundary, Footer, Header } from './components/index.ts';
import { Button, Duration, InvokerProvider, Loader } from './components/ui/index.ts';
import { Auth, Leaderboard, Success, Welcome } from './features/dialogs/index.ts';
import {
	CharactersPopover,
	CharactersProvider,
	type CharacterUi,
	Photograph,
	type Position,
	useCharacters,
	useGameOver,
} from './features/game/index.ts';
import { useInterval } from './hooks/timer.ts';

const Game = () => {
	const { promise, isCharacterRemaining } = useCharacters();
	const data = use(promise);

	const [characters, setCharacters] = useState<CharacterUi[]>(data);
	const [position, setPosition] = useState<Position>('0,0');

	const [canTick, setCanTick] = useState(false);
	const [timer, setTimer] = useState(0);

	const authRef = useRef<HTMLDialogElement>(null);
	const successRef = useRef<HTMLDialogElement>(null);

	const remainingCharacters = characters?.filter(isCharacterRemaining);

	const restart = () => {
		setCharacters(data);
		setTimer(0);
		setCanTick(true);
	};

	const openSuccess = () => {
		authRef.current?.close();
		successRef.current?.showPopover();
	};

	const centisecondDelay = 10;
	const timeout = canTick ? centisecondDelay : undefined;
	useInterval(() => setTimer(timer + centisecondDelay), timeout);

	useGameOver(remainingCharacters, setCanTick, authRef);

	return (
		<>
			<Header />
			<main>
				<div className="shadow/10 flex flex-wrap-reverse justify-between gap-1 shadow-blue-950">
					<div className="items-center-safe flex bg-sky-900 px-3 py-1 font-medium">
						<Duration
							className="separator"
							milliseconds={timer}
							rounding={{ smallestUnit: 'seconds' }}
						/>
						<p aria-live="polite">{remainingCharacters.length} characters remaining</p>
					</div>
					<div className="flex gap-1">
						<Button onClick={restart}>Restart</Button>
						<Leaderboard />
					</div>
				</div>
				<InvokerProvider>
					<Photograph characters={characters} position={position} positionSetter={setPosition} />
					<CharactersPopover
						characters={remainingCharacters}
						position={position}
						charactersSetter={setCharacters}
					/>
				</InvokerProvider>
			</main>
			<Footer />
			<Welcome characters={characters} onClose={() => setCanTick(true)} />
			<Auth bestTime={timer} onAction={openSuccess} ref={authRef} />
			<Success ref={successRef} />
		</>
	);
};

export const App = () => (
	<CharactersProvider>
		<ErrorBoundary>
			<Suspense fallback={<Loader />}>
				<Game />
			</Suspense>
		</ErrorBoundary>
	</CharactersProvider>
);
