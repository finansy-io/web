import {type CardSelectTitleProps} from '../types/CardSelectTitle.types.ts';
import {Icon, Item, List, LoadingWrapper, Popup, usePopupState} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';

export function CardSelectTitle<TValue>(props: CardSelectTitleProps<TValue>) {
	const {value, onChange, options, isLoading, title} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	const {isDesktop} = useResponsive();

	return (
		<>
			<LoadingWrapper isLoading={!!isLoading} isTextSm>
				<div
					className={cn(
						'flex w-fit cursor-pointer items-center gap-1.5 text-sm font-medium text-primary-grey',
						isDesktop && 'hover:cursor-pointer',
					)}
					onClick={openPopup}
				>
					{options.find((option) => option.value === value)?.name + ' ' + title.toLowerCase()}
					<Icon type='selectChevron' className='size-2.5' />
				</div>
			</LoadingWrapper>

			<Popup {...popupProps} title={title}>
				<List
					items={options}
					renderItem={(option) => {
						const checked = value === option.value;
						return (
							<Item
								name={option.name}
								onClick={() => {
									closePopup();
									setTimeout(() => onChange(option.value), 200);
								}}
								rightNode={checked && <Icon type='check' className='flex size-4 self-center text-primary-violet' />}
								className={checked && 'bg-light-grey'}
								isNameText
							/>
						);
					}}
				/>
			</Popup>
		</>
	);
}
