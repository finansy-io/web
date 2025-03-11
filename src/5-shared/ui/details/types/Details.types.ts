import {ReactNode} from 'react';

export type DetailsField = {
	label: string;
	key: string;
	type?: 'custom';
	customNode?: (value: unknown) => ReactNode;
	fallbackValue?: ReactNode;
};

export type RestDetailsField = Omit<DetailsField, 'label' | 'key'>;

export type DetailsProps<T> = {
	details: T;
	detailsFields: DetailsField[];
	isLoading: boolean;
};
