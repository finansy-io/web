import {useEffect, useState} from 'react';
import {type SelectFieldProps} from '../types/SelectField.types';
import {isSortingOption} from '../helpers/SelectField.helpers.ts';
import {SelectTitle} from '../ui/SelectTitle';
import {Button, Icon, Item, List, Popup, PopupHelpers, usePopupState} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';

export function TextSelectField<Value>(props: SelectFieldProps<Value>) {
	const {value, onChange, options, isLoading, children, isCardTitle, isCardRightTitle, withBackground, popupTitle} =
		props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	const [sortingValue, setSortingValue] = useState(value);

	const {isDesktop} = useResponsive();

	useEffect(() => {
		if (value === sortingValue) return;
		setSortingValue(value);
	}, [value]);

	useEffect(() => {
		if (!popupProps.isOpen) {
			setSortingValue(value);
		}
	}, [popupProps.isOpen]);

	return (
		<>
			<SelectTitle
				type='text'
				value={value}
				className={cn(
					isCardTitle && 'font-medium text-primary-grey',
					isCardRightTitle && 'gap-2 font-light text-primary-grey',
					(isCardTitle || isCardRightTitle) && popupProps.isOpen && 'text-black',
					(isCardTitle || isCardRightTitle) &&
						isDesktop &&
						'-m-2 rounded-2xl p-2 hover:bg-on-white-hover active:bg-on-white-active',
					withBackground && 'rounded-2xl bg-light-grey p-2',
					withBackground && isDesktop && 'hover:bg-on-grey-hover active:bg-on-grey-active',
				)}
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
					renderItem={(option) => {
						if (isSortingOption<Value>(option)) {
							const {
								name,
								ascValue,
								descValue,
								ascDescription = APP_TEXT.lowToHigh,
								descDescription = APP_TEXT.highToLow,
								...restOption
							} = option;

							return (
								<Item
									{...restOption}
									name={name}
									rightName={
										<div className='flex items-center gap-1.5 font-light text-primary-grey'>
											{sortingValue === descValue && (
												<>
													<div>{descDescription}</div>
													<Icon type='arrowDown' className='text-sm' />
												</>
											)}
											{sortingValue === ascValue && (
												<>
													<div>{ascDescription}</div>
													<Icon type='arrowUp' className='text-sm' />
												</>
											)}
										</div>
									}
									onClick={() => setSortingValue(sortingValue === descValue ? ascValue : descValue)}
									className={cn(
										(sortingValue === ascValue || sortingValue === descValue) && 'bg-light-grey duration-0',
									)}
									isNameText
								/>
							);
						}

						const {value: optionValue, name, ...restOption} = option;

						return (
							<Item
								{...restOption}
								name={name}
								onClick={() => {
									PopupHelpers.runAfterPopupClosed(() => onChange(optionValue));
									closePopup();
								}}
								isChecked={value === optionValue}
								isNameText
							/>
						);
					}}
				/>

				{options.some(isSortingOption) && (
					<Button
						type='primary'
						onClick={() => {
							PopupHelpers.runAfterPopupClosed(() => onChange(sortingValue));
							closePopup();
						}}
					>
						{APP_TEXT.done}
					</Button>
				)}
			</Popup>
		</>
	);
}
