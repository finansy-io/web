import {type ItemProps} from '@shared/ui/item/types/Item.types.ts';
import {
	type DefaultSelectOption,
	type SortingSelectOption,
} from '@shared/ui/fields/select-field/types/SelectField.types.ts';

export type SettingsConfigs = ItemProps[][];

export type SelectOptions<Value = number> = readonly DefaultSelectOption<Value>[];
export type SortingSelectOptions<Value = number> = readonly SortingSelectOption<Value>[];
