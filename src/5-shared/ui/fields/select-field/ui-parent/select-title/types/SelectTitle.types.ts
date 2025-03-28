import {SelectOption} from '@shared/ui/fields/select-field/types/SelectField.types.ts';
import {ReactNode} from 'react';

export type SelectTitleProps<Value> = {
	type: 'text' | 'title';
	value: Value;
	options: readonly SelectOption<Value>[];
	onClick: () => void;

	isPopupOpen: boolean;
	isLoading?: boolean;
	isChevronRight?: boolean;
	className?: string;
	children?: ReactNode;
};
