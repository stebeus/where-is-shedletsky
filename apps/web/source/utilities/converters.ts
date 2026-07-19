export const toCamelCase = (word: string) => {
	const nonAlphanumericRegex = /[^\p{L}\p{N}$_]/gu;

	const capitalizeRemainder = (word: string, char: string) =>
		word + (char.charAt(0).toUpperCase() + char.slice(1));

	return word
		.toLowerCase()
		.replace(nonAlphanumericRegex, ' ')
		.split(' ')
		.reduce(capitalizeRemainder);
};
