export const captureError = (value: unknown) => {
	if (value instanceof Error) return value;

	let stringified = 'Unable to stringify the thrown value';

	try {
		stringified = JSON.stringify(value, null, '\t');
	} catch {}

	const error = new Error(`This value was not thrown as an error: ${stringified}`);
	return error;
};
