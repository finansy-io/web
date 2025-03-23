import {type SelectFieldProps} from '../types/SelectField.types.ts';
import {SelectTitle} from '../ui/SelectTitle.tsx';
import {Item, List, Popup, PopupHelpers, usePopupState} from '@shared/ui';
import {cn} from '@shared/lib';

export function TextSelectField<Value>(props: SelectFieldProps<Value>) {
	const {
		value,
		onChange,
		options,
		isLoading,
		children,

		isCardTitle,
		isCardRightTitle,
		withBackground,
		popupTitle,
	} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	return (
		<>
			<SelectTitle
				type='text'
				className={cn(
					isCardTitle && 'font-medium text-primary-grey',
					isCardRightTitle && 'gap-2 font-light text-primary-grey',
					withBackground && 'rounded-2xl bg-light-grey p-2',
				)}
				value={value}
				options={options}
				onClick={openPopup}
				isPopupOpen={popupProps.isOpen}
				isChevronRight={isCardRightTitle}
				isLoading={isLoading}
			>
				{children}
			</SelectTitle>

			<Popup {...popupProps} title={popupTitle}>
				<List
					items={options}
					renderItem={({value: optionValue, ...restOption}) => (
						<Item
							{...restOption}
							onClick={() => {
								closePopup();
								PopupHelpers.runAfterPopupClosed(() => onChange(optionValue));
							}}
							isChecked={value === optionValue}
							isNameText
						/>
					)}
				/>
			</Popup>
		</>
	);
}
