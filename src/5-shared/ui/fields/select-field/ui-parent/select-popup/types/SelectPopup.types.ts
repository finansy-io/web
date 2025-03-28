import {PopupProps} from '@shared/ui/popup/ui/popup/types/Popup.types.ts';
import {SelectOption} from '../../../types/SelectField.types.ts';

export type SelectPopupProps<Value> = Pick<PopupProps, 'isOpen' | 'setIsOpen' | 'title'> & {
	value: Value;
	onChange: (value: Value) => void;
	closePopup: () => void;
	options: readonly SelectOption<Value>[];
	sortingValue: Value;
	setSortingValue: (value: Value) => void;
};
