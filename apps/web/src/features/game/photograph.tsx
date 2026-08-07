import { Index } from 'solid-js';

import { InvokerButton } from '#components/ui/index.ts';

type Placement = {
	description: string;
	position: [number, number];
	wasFound: boolean;
};

const createPlacement = ({ description, position: [row, column], wasFound }: Placement) =>
	({ row, column, description, wasFound }) as const;

const createGrid = (rows: number, columns: number, placements: any[]) => {
	const createColumns = () => new Array(columns);

	const grid = Array.from({ length: rows }, createColumns);

	for (const { row, column, description, wasFound } of placements) {
		// @ts-expect-error
		grid[row][column] = { description, wasFound };
	}

	return grid;
};

const renderCell = (row: any, positionSetter: any) => (placements: any, column: any) => {
	const { wasFound, description } = placements ?? {};
	const disabled = wasFound && { disabled: true };

	const ariaLabel = description != null && {
		'aria-label': `${description}, located at row ${row} and column ${column}`,
	};

	const tabIndex = description == null && { tabIndex: -1 };

	const getPosition = () => positionSetter([row, column]);

	return (
		<InvokerButton
			command="toggle-popover"
			{...disabled}
			{...ariaLabel}
			{...tabIndex}
			onClick={getPosition}
		/>
	);
};

export const Photograph = (props: any) => {
	console.log(props.characters());

	const placements = props.characters().map(createPlacement);
	const grid = createGrid(50, 50, placements);

	const renderRow = (_: any, row: any) => grid[row]!.map(renderCell(row, props.positionSetter));

	return (
		<div>
			<Index each={grid}>{renderRow}</Index>
		</div>
	);
};
