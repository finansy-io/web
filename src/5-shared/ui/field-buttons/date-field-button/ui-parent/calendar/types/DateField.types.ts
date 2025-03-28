export type CalendarProps = {
	value: Date | null;
	onChange: (value: Date | null) => void;
	minDate?: Date;
	withReset?: boolean;
};
