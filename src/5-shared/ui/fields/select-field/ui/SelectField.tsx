import {type SelectFieldProps} from '../types/SelectField.types.ts';
import {Icon, Item, List, LoadingWrapper, Popup, PopupHelpers, usePopupState} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';

export function SelectField<Value>(props: SelectFieldProps<Value>) {
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

	const {isDesktop} = useResponsive();

	return (
		<>
			<LoadingWrapper isLoading={!!isLoading} isTextSm>
				<div
					className={cn(
						'flex w-fit items-center gap-1.5 text-sm font-normal text-black',
						isDesktop && 'hover:cursor-pointer',
						isCardRightTitle && 'gap-2',

						isCardTitle && 'font-medium text-primary-grey',
						isCardRightTitle && 'font-light text-primary-grey',
						withBackground && 'rounded-2xl bg-light-grey p-2',
					)}
					onClick={openPopup}
				>
					{isCardRightTitle ? (
						<>
							<Icon type='chevronDown' className='size-2.5 flex-shrink-0' />
							{children ? children : options.find((option) => option.value === value)?.name}
						</>
					) : (
						<>
							{children ? children : options.find((option) => option.value === value)?.name}
							<Icon type='chevronDown' className='size-2.5 flex-shrink-0' />
						</>
					)}
				</div>
			</LoadingWrapper>

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
						/>
					)}
				/>
			</Popup>
		</>
	);
}

//  1. TextSelectField - смерджить SelectField и TextSelectField и использовать его только для текста
//  2. TitleSelectField - все другое, не получается отнаследоваться vs написать уникальный ParentSelectField??

// рендерить кастомные popup-options
//  - продумать options-type, чтобы делать spread в <Item />
//  - тут сейчас data + value for select + props like Item

// renderPopupLeftTitle,
// renderPopupRightTitle,
// popupPreSelectListChildren,
// popupAfterSelectListChildren,
// popupRightTitle?: ReactNode;
// getRightTitle?: ({closePopup}: {closePopup: () => void}) => ReactNode;
// renderPopupItem?: (option: any) => ReactNode;
// popupChildren?: ReactNode;
// when popupProps.isOpen - custom styles - при текущей имплементации не получится сделать
