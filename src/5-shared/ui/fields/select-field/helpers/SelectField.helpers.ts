import {ReactNode} from 'react';
import {SelectOption, SortingSelectOption} from '../types/SelectField.types.ts';

export function isSortingOption<Value>(option: any): option is SortingSelectOption<Value> {
	return 'ascValue' in option && 'descValue' in option;
}

export function getSelectTitle<Value>(value: Value, options: readonly SelectOption<Value>[], children?: ReactNode) {
	if (children) {
		return children;
	}

	return options.find((option) => {
		if (isSortingOption<Value>(option)) {
			return value === option.ascValue || value === option.descValue;
		}

		return option.value === value;
	})?.name;
}
