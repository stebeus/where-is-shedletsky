import type { CharacterState } from '#types/game.ts';

import { PopoverTrigger } from '#components/ui/index.ts';

type Placement = ReturnType<typeof createPlacement>;

type PhotographProps = {
	characters: CharacterState[];
	positionSetter: (position: `${number},${number}`) => void;
};

const createPlacement = ({ description, position: { x, y }, wasFound }: CharacterState) =>
	({ row: y, column: x, description, wasFound }) as const;

const createGrid = (rows: number, columns: number, placements: Placement[]) => {
	const createColumns = () => new Array(columns).fill(undefined);

	const grid = Array.from({ length: rows }, createColumns);

	for (const { row, column, description, wasFound } of placements) {
		// @ts-expect-error
		grid[row][column] = { description, wasFound };
	}

	return grid;
};

const renderCell =
	(row: number, positionSetter: (position: `${number},${number}`) => void) =>
	(placement: Placement, column: number) => {
		const { wasFound, description } = placement ?? {};

		const ariaLabel = description != null && {
			'aria-label': `${description}, located at row ${row} and column ${column}`,
		};

		const disabled = wasFound && { disabled: true };
		const tabIndex = description == null && { tabIndex: -1 };

		return (
			<PopoverTrigger
				{...ariaLabel}
				{...disabled}
				{...tabIndex}
				onClick={() => positionSetter(`${row},${column}`)}
				key={crypto.randomUUID()}
			/>
		);
	};

export const Photograph = ({ characters = [], positionSetter }: PhotographProps) => {
	const placements = characters.map(createPlacement);
	const grid = createGrid(19, 36, placements);

	// @ts-expect-error
	const renderRow = (_: unknown, row: number) => grid[row].map(renderCell(row, positionSetter));

	return <div className="grid">{grid.map(renderRow)}</div>;
};
