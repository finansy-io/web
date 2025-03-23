import {ItemProps} from '@shared/ui/item/types/Item.types.ts';

export type SettingsConfigs = ItemProps[][];

export type TabConfigs = {label: string; path: string}[];

export type SelectOptions<Value> = readonly ({value: Value} & ItemProps)[];
