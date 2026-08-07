import { createEffect, createResource, createSignal, ErrorBoundary, Suspense } from 'solid-js';

import { fetchInternalData } from '#utils/fetch.ts';

import { Footer, Header, renderErrorFallback } from './components/index.ts';
import { InvokerProvider, Loader } from './components/ui/index.ts';
import { Auth, Leaderboard, Success, Welcome } from './features/dialogs/index.ts';
import { CharactersPopover, Photograph } from './features/game/index.ts';
import { makeTimer } from './primitives/timer.ts';

const createCharacter = (character: any) => ({ ...character, wasFound: false });

const isCharacterRemaining = (props: any) => !props.wasFound;

export const App = () => {
	const [characters, setCharacters] = createSignal<any>([]);
	const [position, setPosition] = createSignal<any>([]);
	const [timer, setTimer] = createSignal(0);

	const [data] = createResource<any[]>(async () => await fetchInternalData('characters'));

	const remainingCharacters = () => characters()?.filter(isCharacterRemaining);

	let authRef!: HTMLDialogElement;
	let successRef!: HTMLDialogElement;

	const openSuccess = () => {
		authRef.close();
		successRef.showPopover();
	};

	const e = () => setCharacters(data()?.map(createCharacter));

	makeTimer(() => setTimer(timer() + 1), 1, setInterval);

	return (
		<>
			<Header />
			<main>
				<p>{timer()}</p>
				<Leaderboard />
				<ErrorBoundary fallback={renderErrorFallback}>
					<Suspense fallback={<Loader />}>
						<InvokerProvider>
							<Photograph characters={e()} positionSetter={setPosition} />
							<CharactersPopover
								characters={remainingCharacters}
								position={position}
								charactersSetter={setCharacters}
							/>
						</InvokerProvider>
					</Suspense>
				</ErrorBoundary>
			</main>
			<Footer />
			<Welcome />
			<Auth bestTime={timer()} onAction={openSuccess} />
			<Success />
		</>
	);
};
