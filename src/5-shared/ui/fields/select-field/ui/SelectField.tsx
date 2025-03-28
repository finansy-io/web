import {type SelectFieldProps} from '../types/SelectField.types.ts';
import {SelectPopup, SelectTitle} from '../ui-parent';
import {usePopupState} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';
import {useSelectSortingValue} from '@shared/ui/fields/select-field/hooks/SelectField.hooks.ts';

export function SelectField<Value>(props: SelectFieldProps<Value>) {
	const {value, onChange, options, isLoading, children, withBackground, popupTitle, isChevronRight, className} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	const {sortingValue, setSortingValue} = useSelectSortingValue(popupProps.isOpen, value);

	const {isMobile, isTablet, isDesktop} = useResponsive();

	return (
		<>
			<SelectTitle
				type='text'
				value={value}
				className={cn(
					withBackground && 'rounded-2xl bg-light-grey p-2',
					withBackground && (isMobile || isTablet) && 'active:text-primary-grey',
					withBackground && isDesktop && 'hover:bg-on-grey-hover active:bg-on-grey-active',
					className,
				)}
				options={options}
				onClick={openPopup}
				isPopupOpen={popupProps.isOpen}
				isChevronRight={isChevronRight}
				isLoading={isLoading}
			>
				{children}
			</SelectTitle>

			<SelectPopup
				{...{...popupProps, popupTitle, closePopup, options, onChange, sortingValue, setSortingValue, value}}
			/>
		</>
	);
}
