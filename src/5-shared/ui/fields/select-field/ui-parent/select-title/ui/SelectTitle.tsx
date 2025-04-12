import {getSelectTitle} from '../helpers/SelectField.helpers.ts';
import {SelectTitleProps} from '../types/SelectTitle.types.ts';
import {cn, useResponsive} from '@shared/lib';
import {Icon, LoadingWrapper} from '@shared/ui';

export function SelectTitle<Value>(props: SelectTitleProps<Value>) {
	const {value, options, onClick, type, isLoading, className, children, isChevronRight, isPopupOpen} = props;

	const {isTouchable, isClickable} = useResponsive();

	if (type === 'text') {
		const title = getSelectTitle(value, options, children);
		const Chevron = <Icon type='chevronDown' className={cn(type === 'text' && 'size-2.5', 'flex-shrink-0')} />;

		return (
			<LoadingWrapper isLoading={!!isLoading} isTextSm={type === 'text'}>
				<div
					className={cn(
						'flex w-fit cursor-pointer items-center gap-1.5 text-sm font-normal text-black transition duration-200',
						isPopupOpen && 'text-primary-grey',
						isTouchable && 'active:text-primary-grey',
						className,
					)}
					onClick={onClick}
				>
					{isChevronRight ? (
						<>
							{Chevron}
							{title}
						</>
					) : (
						<>
							{title}
							{Chevron}
						</>
					)}
				</div>
			</LoadingWrapper>
		);
	}

	if (type === 'title') {
		return (
			<div
				className={cn(
					'flex cursor-pointer items-center gap-2 text-[17px] font-semibold transition duration-200',
					isPopupOpen && 'text-primary-grey',
					isTouchable && 'active:text-primary-grey',
					isClickable && '-my-2 rounded-2xl px-3 py-2 hover:bg-on-grey-hover active:bg-on-grey-active',
				)}
				onClick={onClick}
			>
				<div>{getSelectTitle(value, options)}</div>
				<Icon type='chevronDown' className='size-3 flex-shrink-0' />
			</div>
		);
	}
}
