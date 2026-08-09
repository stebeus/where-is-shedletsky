import { useEffect, useRef } from 'react';

type TimeSetter = typeof setInterval | typeof setTimeout;

export const useTimer = (timeSetter: TimeSetter, handler: () => void, timeout?: number) => {
	const handlerRef = useRef(handler);

	useEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		if (timeout == null) return;

		const tick = () => handlerRef.current();
		const id = timeSetter(tick, timeout);

		return () => clearInterval(id);
	}, [timeout, timeSetter]);
};
