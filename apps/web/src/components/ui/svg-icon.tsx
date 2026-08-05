import { toKebabCase } from '#utils/formatters.ts';

type SvgIconProps = {
	title: string;
};

export const SvgIcon = (props: SvgIconProps) => (
	<svg width={24} height={24} fill="currentColor">
		<title>{props.title}</title>
		<use href={`/icons.svg#${toKebabCase(props.title)}-icon`} />
	</svg>
);
