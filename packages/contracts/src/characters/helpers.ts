export const parsePosition = (value: string) => {
	const [row = 0, column = 0] = value.split(',').map(Number);
	return { x: column, y: row };
};
