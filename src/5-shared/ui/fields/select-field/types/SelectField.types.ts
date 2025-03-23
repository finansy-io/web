import {ReactNode} from 'react';
import {SelectOptions} from '@shared/types';

export type SelectFieldProps<Value> = {
	value: Value;
	onChange: (value: Value) => void;
	options: SelectOptions<Value>;
	isLoading?: boolean;
	children?: ReactNode;

	isCardTitle?: boolean;
	isCardRightTitle?: boolean;
	withBackground?: boolean;
	popupTitle: ReactNode;
};
