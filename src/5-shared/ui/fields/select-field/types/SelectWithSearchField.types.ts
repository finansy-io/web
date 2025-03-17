import {CURRENCY} from '@shared/constants';

export type SelectWithSearchOption = {
	name: string;
	description: string;
	value: CURRENCY;
};

export type SelectWithSearchFieldProps = {
	options?: SelectWithSearchOption[];
	fetchOptions?: () => void;
	onChange: (value: CURRENCY) => void;
	value: CURRENCY | null | undefined;
};
