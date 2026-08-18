import type { CharacterUi, Position } from './types.ts';

import { CircleCheck } from 'lucide-react';

import { PopoverTrigger } from '#components/ui/index.ts';

type PhotographProps = {
	characters: CharacterUi[];
	position: Position;
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
	(row: number, currentPosition: Position, positionSetter: (position: Position) => void) =>
	({ description, wasFound }: Partial<CharacterUi> = {}, column: number = 0) => {
		// This prevents anchor-name from lagging the game
		const isActive = currentPosition === `${row},${column}`;

		const ariaLabel = description != null && {
			'aria-label': `${description}, located at row ${row} and column ${column}`,
		};

		const tabIndex = description == null && { tabIndex: -1 };

		return (
			<PopoverTrigger
				className="cell justify-center-safe items-center-safe flex cursor-dot mix-blend-difference outline-white -outline-offset-2 hover:outline-2 focus-visible:outline-2 active:outline-4 active:-outline-offset-4 disabled:mix-blend-screen disabled:outline-none focus-visible:enabled:aria-[label]:animate-pulse-outline hover:enabled:aria-[label]:animate-pulse-outline"
				disabled={wasFound}
				style={isActive ? { anchorName: '--characters-popover' } : undefined}
				{...ariaLabel}
				{...tabIndex}
				onClick={() => positionSetter(`${row},${column}`)}
				key={`${row}${column}`}
			>
				{wasFound && <CircleCheck className="text-[springGreen]" />}
			</PopoverTrigger>
		);
	};

export const Photograph = ({ characters = [], position, positionSetter }: PhotographProps) => {
	const placements = characters.map(createPlacement);
	const grid = createGrid(20, 36, placements);

	const renderRow = (_: [][], row: number) =>
		grid[row]?.map(renderCell(row, position, positionSetter));

	return (
		<div className="shadow/10 grid grid-cols-(--photograph-width) grid-rows-(--photograph-height) border-5 bg-cover bg-photograph bg-no-repeat shadow-blue-950">
			{grid.map(renderRow)}
		</div>
	);
};
