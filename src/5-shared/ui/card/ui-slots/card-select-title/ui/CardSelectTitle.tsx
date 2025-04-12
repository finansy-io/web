import {SelectTitle, usePopupState} from '@shared/ui';
import {clickableTitleStyles, touchableTitleStyles} from '../../styles/CardSlots.styles.ts';
import {SelectPopup} from '@shared/ui/fields/select-field/ui-parent';
import {useSelectSortingValue} from '@shared/ui/fields/select-field/hooks/SelectField.hooks.ts';
import type {SelectFieldProps} from '@shared/ui/fields/select-field/types/SelectField.types.ts';
import {cn, useResponsive} from '@shared/lib';

export function CardSelectTitle<Value>(
	props: Omit<SelectFieldProps<Value>, 'withBackground'> & {isRightTitle?: boolean},
) {
	const {value, onChange, options, isLoading, children, popupTitle, isRightTitle} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	const {sortingValue, setSortingValue} = useSelectSortingValue(popupProps.isOpen, value);

	const {isTouchable, isClickable} = useResponsive();

	return (
		<>
			<SelectTitle
				type='text'
				value={value}
				className={cn(
					'font-medium text-primary-grey',
					isRightTitle && 'gap-2 font-light',
					popupProps.isOpen && 'text-black',
					isTouchable && touchableTitleStyles,
					isClickable && clickableTitleStyles,
				)}
				options={options}
				onClick={openPopup}
				isPopupOpen={popupProps.isOpen}
				isChevronRight={isRightTitle}
				isLoading={isLoading}
			>
				{children}
			</SelectTitle>

			<SelectPopup
				{...{...popupProps, title: popupTitle, closePopup, options, onChange, sortingValue, setSortingValue, value}}
			/>
		</>
	);
}
