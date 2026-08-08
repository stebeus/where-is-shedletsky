import { onCleanup } from 'solid-js';

type TimeSetter = typeof setInterval | typeof setTimeout;

export const makeTimer = (timeSetter: TimeSetter, timeout: number, handler: TimerHandler) => {
	const intervalId = timeSetter(handler, timeout);
	return onCleanup(() => clearInterval(intervalId));
};
