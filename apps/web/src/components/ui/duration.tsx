type DurationProps = {
	milliseconds: number;
	locales?: Intl.LocalesArgument;
	format?: Intl.DurationFormatOptions;
};

export const Duration = ({
	milliseconds,
	locales = 'en',
	format: { style = 'digital', hoursDisplay = 'auto', minutesDisplay = 'auto', ...format } = {},
}: DurationProps) => {
	const duration = Temporal.Duration.from({ milliseconds }).round({ largestUnit: 'days' });

	return (
		<time dateTime={duration.toString()}>
			{duration.toLocaleString(locales, { style, hoursDisplay, minutesDisplay, ...format })}
		</time>
	);
};
