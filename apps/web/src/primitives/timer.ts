import { onCleanup } from 'solid-js';

export const makeTimer = (
	handler: TimerHandler,
	timeout: number,
	timer: typeof setInterval | typeof setTimeout,
) => {
	const intervalId = timer(handler, timeout);
	return onCleanup(() => clearInterval(intervalId));
};
