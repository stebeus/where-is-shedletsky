export const parsePosition = (value: string) => {
	const [row, column] = value.split(',').map(Number);
	return { x: column, y: row };
};
