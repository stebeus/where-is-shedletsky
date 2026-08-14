import { useEffect, useRef } from 'react';

type TimeSetter = typeof setInterval | typeof setTimeout;

type TimerHook = (handler: () => void, timeout?: number) => void;

const useTimer = (timeSetter: TimeSetter, handler: () => void, timeout?: number) => {
	const handlerRef = useRef(handler);

	useEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		if (timeout == null) return;

		const id = timeSetter(() => handlerRef.current(), timeout);
		const clear = timeSetter === setInterval ? clearInterval : clearTimeout;

		return () => clear(id);
	}, [timeout, timeSetter]);
};

export const useInterval: TimerHook = (handler, timeout) => useTimer(setInterval, handler, timeout);

export const useTimeout: TimerHook = (handler, timeout) => useTimer(setTimeout, handler, timeout);
