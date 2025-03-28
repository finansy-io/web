import {SelectTitle, usePopupState} from '@shared/ui';
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

	const {isMobile, isTablet, isDesktop} = useResponsive();

	return (
		<>
			<SelectTitle
				type='text'
				value={value}
				className={cn(
					'font-medium text-primary-grey',
					isRightTitle && 'gap-2 font-light',
					popupProps.isOpen && 'text-black',
					(isMobile || isTablet) && 'active:text-black',
					isDesktop && '-m-2 rounded-2xl p-2 hover:bg-on-white-hover active:bg-on-white-active',
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
				{...{...popupProps, popupTitle, closePopup, options, onChange, sortingValue, setSortingValue, value}}
			/>
		</>
	);
}
