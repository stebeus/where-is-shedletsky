import type { ComponentPropsWithoutRef } from 'react';

type ShortcutProps = ComponentPropsWithoutRef<'kbd'>;

export const Shortcut = (props: ShortcutProps) => (
	<kbd
		className="border border-gray-300 bg-white px-1.5 py-0.5 font-bold text-gray-800 text-sm"
		{...props}
	/>
);
