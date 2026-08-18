import type { CharacterUi } from './types.ts';

import { type RefObject, useEffect } from 'react';

export const useGameOver = (
	remainingCharacters: CharacterUi[],
	canTickSetter: (canTick: boolean) => void,
	authRef: RefObject<HTMLDialogElement | null>,
) => {
	useEffect(() => {
		if (remainingCharacters.length > 0) return;
		canTickSetter(false);
		authRef.current?.showModal();
	}, [remainingCharacters, canTickSetter, authRef]);
};

export const useScreenShake = () => {
	useEffect(() => {
		const { body } = document;
		const animation = 'animate-shake-screen';

		body.classList.add(animation);

		return () => body.classList.remove(animation);
	}, []);
};
