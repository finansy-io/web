import {DefaultSelectOption} from '@shared/ui/fields/select-field/types/SelectField.types.ts';

export type SelectTabsProps<Value> = {
	value: (value: Value) => void;
	onChange: (value: Value) => void;
	options: readonly DefaultSelectOption<Value>[];
};
