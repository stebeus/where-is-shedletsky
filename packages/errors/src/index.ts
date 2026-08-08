export const catchError = (value: unknown) => {
	if (Error.isError(value)) return value;

	let stringified = `Unable to stringify ${typeof value}`;

	try {
		stringified = JSON.stringify(value, null, '\t');
	} catch {}

	return new Error(`Unexpected throw: ${stringified}`);
};

export const catchErrnoException = (value: unknown): NodeJS.ErrnoException => catchError(value);
