import type { Character } from '@repo/contracts/characters';
import type { CharacterState } from './types/game.ts';

import { useEffect, useRef, useState } from 'react';

import { fetchInternalData } from '#utils/index.ts';

import { Footer, Header } from './components/index.ts';
import { Button, InvokerProvider } from './components/ui/index.ts';
import { Auth, Leaderboard, Success, Welcome } from './features/dialogs/index.ts';
import { CharactersPopover, Photograph } from './features/game/index.ts';
import { useTimer } from './hooks/index.ts';

const createCharacter = (character: Character) => ({ ...character, wasFound: false }) as const;

const fetchCharacters = async () => {
	const data = await fetchInternalData<Character[]>('characters');

	return data.map(createCharacter);
};

const data = await fetchCharacters();

const isCharacterRemaining = ({ wasFound }: CharacterState) => !wasFound;

export const App = () => {
	const [characters, setCharacters] = useState<CharacterState[]>(data);
	const [position, setPosition] = useState<`${number},${number}`>();

	const [canTick, setCanTick] = useState(false);
	const [timer, setTimer] = useState(0);

	const authRef = useRef<HTMLDialogElement>(null);
	const successRef = useRef<HTMLDialogElement>(null);

	const openSuccess = () => {
		authRef.current?.close();
		successRef.current?.showPopover();
	};

	const restart = () => {
		setCharacters(characters.map(createCharacter));
		setTimer(0);
		setCanTick(true);
	};

	const timeout = canTick ? 10 : undefined;
	useTimer(setInterval, () => setTimer(timer + 1), timeout);

	const remainingCharacters = characters?.filter(isCharacterRemaining);

	useEffect(() => {
		console.log(characters);

		if (remainingCharacters?.length < 1 && canTick) {
			setCanTick(false);
			authRef.current?.showModal();
		}
	}, [remainingCharacters, canTick, characters]);

	return (
		<>
			<Header />
			<main>
				<time dateTime={timer.toString()}>{timer}</time>
				<Button onClick={restart}>Restart</Button>
				<Leaderboard />
				<InvokerProvider>
					<Photograph characters={characters} positionSetter={setPosition} />
					<CharactersPopover
						characters={remainingCharacters}
						position={position!}
						charactersSetter={setCharacters}
					/>
				</InvokerProvider>
			</main>
			<Footer />
			<Welcome onClose={() => setCanTick(true)} />
			<Auth bestTime={timer} ref={authRef} onAction={openSuccess} />
			<Success ref={successRef} />
		</>
	);
};
