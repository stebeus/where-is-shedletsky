import type { CharacterUi, Position } from './types.ts';

import { PopoverTrigger } from '#components/ui/index.ts';

type PhotographProps = {
	characters: CharacterUi[];
	positionSetter: (position: Position) => void;
};

type Placement = ReturnType<typeof createPlacement>;

const createPlacement = ({ description, position: { x, y }, wasFound }: CharacterUi) =>
	({ row: y, column: x, description, wasFound }) as const;

const createGrid = (rows: number, columns: number, placements: Placement[]) => {
	const createColumns = () => new Array(columns).fill(undefined);

	const grid = Array.from({ length: rows }, createColumns);

	for (const { row, column, description, wasFound } of placements) {
		if (grid[row] == null) grid[row] = [];
		grid[row][column] = { description, wasFound };
	}

	return grid;
};

const renderCell =
	(row: number, positionSetter: (position: Position) => void) =>
	({ description, wasFound }: Partial<CharacterUi> = {}, column: number = 0) => {
		const ariaLabel = description != null && {
			'aria-label': `${description}, located at row ${row} and column ${column}`,
		};

		const tabIndex = description == null && { tabIndex: -1 };

		return (
			<PopoverTrigger
				disabled={wasFound}
				{...ariaLabel}
				{...tabIndex}
				onClick={() => positionSetter(`${row},${column}`)}
				key={crypto.randomUUID()}
			/>
		);
	};

export const Photograph = ({ characters = [], positionSetter }: PhotographProps) => {
	const placements = characters.map(createPlacement);
	const grid = createGrid(19, 36, placements);

	const renderRow = (_: [][], row: number) => grid[row]?.map(renderCell(row, positionSetter));

	return <div className="grid">{grid.map(renderRow)}</div>;
};
