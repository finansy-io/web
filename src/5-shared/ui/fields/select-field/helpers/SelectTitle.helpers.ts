import {ReactNode} from 'react';
import {SelectOptions} from '@shared/types';

export function getSelectTitle<Value>(value: Value, options: SelectOptions<Value>, children?: ReactNode) {
	return children ? children : options.find((option) => option.value === value)?.name;
}
