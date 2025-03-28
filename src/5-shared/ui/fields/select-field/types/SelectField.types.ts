import {ReactNode} from 'react';
import {ItemProps} from '@shared/ui/item/types/Item.types.ts';

export type DefaultSelectOption<Value> = {
	name: ReactNode; // Например, "By market cap"
	value: Value; // Например, 1
} & ItemProps;

export type SortingSelectOption<Value> = {
	name: ReactNode;
	ascValue: Value; // Значение для режима "Ascending"
	descValue: Value; // Значение для режима "Descending"
	ascDescription?: ReactNode; // Описание для ascending, например, "Lowest to highest"
	descDescription?: ReactNode; // Описание для descending, например, "Highest to lowest"
} & ItemProps;

export type SelectOption<Value> = DefaultSelectOption<Value> | SortingSelectOption<Value>;

export type SelectFieldProps<Value> = {
	value: Value;
	onChange: (value: Value) => void;
	options: readonly SelectOption<Value>[];
	popupTitle: ReactNode;
	isLoading?: boolean;
	children?: ReactNode;
	withBackground?: boolean;
	className?: string;
	isChevronRight?: boolean;
};
