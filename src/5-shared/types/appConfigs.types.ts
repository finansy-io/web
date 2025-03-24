import {type ItemProps} from '@shared/ui/item/types/Item.types.ts';
import {
	type DefaultSelectOption,
	type SortingSelectOption,
} from '@shared/ui/fields/select-field/types/SelectField.types.ts';

export type SettingsConfigs = ItemProps[][];

export type TabConfigs = {label: string; path: string}[];

export type SortingSelectOptions<Value> = readonly SortingSelectOption<Value>[];
export type SelectOptions<Value> = readonly DefaultSelectOption<Value>[];
