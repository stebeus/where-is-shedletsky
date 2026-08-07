import { useEffect, useState } from 'react';

import { useFetch } from '#root/hooks/fetch.js';
import { formatSeconds, getDurationInSeconds } from '#root/utilities/index.js';

import { CharactersPopover } from './characters-popover.jsx';
import { Photograph } from './photograph.jsx';
import { ErrorFallback, Loader, MainButton } from './ui/index.js';

const createCharacter = (character) => ({ ...character, wasFound: false });

const isCharacterRemaining = ({ wasFound }) => !wasFound;

export const Game = ({ authenticationRef, timer, canTickSetter, timerSetter }) => {
	const [characters, setCharacters] = useState([]);
	const [position, setPosition] = useState([]);

	const { data, isLoading, error } = useFetch('characters');

	const remainingCharacters = characters?.filter(isCharacterRemaining);

	const handleRestart = () => {
		setCharacters(data.map(createCharacter));
		timerSetter(0);
		canTickSetter(true);
	};

	useEffect(() => setCharacters(data?.map(createCharacter)), [data]);

	useEffect(() => {
		if (!isLoading && remainingCharacters?.length < 1) {
			canTickSetter(false);
			authenticationRef.current.showModal();
		}
	}, [isLoading, remainingCharacters, canTickSetter, authenticationRef]);

	if (isLoading) return <Loader />;
	if (error != null) return <ErrorFallback error={error} />;

	return (
		<main>
			<div class="flex flex-wrap justify-between">
				<div class="*:pipe-separator-inverted flex flex-wrap bg-accent px-3 py-1 font-medium text-base">
					<time dateTime={getDurationInSeconds(timer)} aria-live="off" role="timer">
						{formatSeconds(timer, { shouldRound: true })}
					</time>
					<p>{remainingCharacters?.length} characters remaining</p>
				</div>
				<div class="flex flex-wrap gap-1">
					<MainButton onClick={handleRestart}>Restart</MainButton>
					<MainButton commandfor="leaderboard-modal" command="show-modal">
						Leaderboard
					</MainButton>
				</div>
			</div>
			<Photograph characters={characters} positionSetter={setPosition} />
			<CharactersPopover
				characters={remainingCharacters}
				position={position}
				charactersSetter={setCharacters}
			/>
		</main>
	);
};
