import {SelectPopupProps} from '../types/SelectPopup.types.ts';
import {Button, Icon, isSortingOption, Item, List, Popup, PopupHelpers} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {cn} from '@shared/lib';

export function SelectPopup<Value>(props: SelectPopupProps<Value>) {
	const {title, closePopup, options, onChange, sortingValue, setSortingValue, value, ...popupProps} = props;

	return (
		<Popup
			{...popupProps}
			title={title}
			actionButtonNode={
				options.some(isSortingOption) && (
					<Button
						type='primary'
						onClick={() => {
							PopupHelpers.runAfterPopupClosed(() => onChange(sortingValue));
							closePopup();
						}}
					>
						{APP_TEXT.done}
					</Button>
				)
			}
		>
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
								className={cn((sortingValue === ascValue || sortingValue === descValue) && 'bg-light-grey duration-0')}
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
		</Popup>
	);
}
