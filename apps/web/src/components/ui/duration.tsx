import type { ComponentPropsWithoutRef } from 'react';

type DurationProps = ComponentPropsWithoutRef<'base'> & {
	milliseconds: number;
	locales?: Intl.LocalesArgument;
	rounding?: Temporal.DurationRoundingOptions;
	format?: Intl.DurationFormatOptions;
};

export const Duration = ({
	className,
	milliseconds,
	locales = 'en',
	rounding,
	format: { style = 'narrow', ...format } = {},
}: DurationProps) => {
	const duration = Temporal.Duration.from({ milliseconds }).round({
		largestUnit: 'days',
		...rounding,
	});

	return (
		<time className={className} dateTime={duration.toString()}>
			{duration.toLocaleString(locales, { style, ...format }) || 0}
		</time>
	);
};
