import {ReactNode} from 'react';
import {getSelectTitle} from '../helpers/SelectField.helpers.ts';
import {SelectOption} from '../types/SelectField.types.ts';
import {cn, useResponsive} from '@shared/lib';
import {Icon, LoadingWrapper} from '@shared/ui';

type SelectTitleProps<Value> = {
	type: 'text' | 'title';
	value: Value;
	options: readonly SelectOption<Value>[];
	onClick: () => void;

	isPopupOpen: boolean;
	isLoading?: boolean;
	isChevronRight?: boolean;
	className?: string;
	children?: ReactNode;
};

export function SelectTitle<Value>(props: SelectTitleProps<Value>) {
	const {value, options, onClick, type, isLoading, className, children, isChevronRight, isPopupOpen} = props;

	const {isDesktop} = useResponsive();

	if (type === 'text') {
		const title = getSelectTitle(value, options, children);
		const Chevron = <Icon type='chevronDown' className={cn(type === 'text' && 'size-2.5', 'flex-shrink-0')} />;

		return (
			<LoadingWrapper isLoading={!!isLoading} isTextSm={type === 'text'}>
				<div
					className={cn(
						'flex w-fit cursor-pointer items-center gap-1.5 text-sm font-normal text-black',
						isPopupOpen && 'brightness-95',
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
					'flex cursor-pointer items-center gap-2 text-xl font-medium transition duration-200 active:text-primary-grey',
					isPopupOpen && 'text-primary-grey',
					isDesktop && 'hover:text-primary-grey',
				)}
				onClick={onClick}
			>
				<div>{getSelectTitle(value, options)}</div>
				<Icon type='chevronDown' className='size-3 flex-shrink-0' />
			</div>
		);
	}
}
