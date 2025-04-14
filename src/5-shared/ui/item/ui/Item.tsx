import {useNavigate} from 'react-router-dom';
import {ItemProps} from '../types/Item.types.ts';
import {cn, isBoolean, styleElement, useResponsive} from '@shared/lib';
import {Icon} from '@shared/ui';

export function Item(props: ItemProps) {
	const {
		image,
		imageIcon,
		name,
		description,
		rightName,
		rightDescription,
		isNameText,
		leftNode,
		rightNode,
		onClick,
		className,
		isSingle,
		isChecked,
		isMenuItem: isMenuItemProp,
		isDestructiveMenuItem,
	} = props;

	const navigate = useNavigate();

	const {isTouchable, isClickable} = useResponsive();

	const showIconCheckmark = isChecked && image;
	const showRightCheckmark = isChecked && !image;

	const isMenuItem = isMenuItemProp || isDestructiveMenuItem;

	const withTouchState = onClick && isTouchable;
	const withClickState = onClick && isClickable;

	return (
		<div
			className={cn(
				'group rounded-2xl bg-white p-1',
				!isSingle && '[&:not(:last-child)]:pb-0',
				onClick && 'cursor-pointer',
			)}
			onClick={() => onClick?.({navigate})}
		>
			<div
				className={cn(
					'flex w-full rounded-2xl p-3 text-left duration-300',
					withTouchState && 'group-active:bg-on-white-hover',
					withClickState && 'group-hover:bg-on-white-hover group-active:bg-on-white-active',
					isChecked && 'bg-light-grey',
					className,
				)}
			>
				{leftNode && <div className='mr-4 flex flex-shrink-0 items-center'>{leftNode}</div>}

				{image && (
					<div className='relative my-0.5 mr-4 flex-shrink-0'>
						{isMenuItem ? styleElement(image, cn('size-5', isDestructiveMenuItem && 'text-red-600')) : image}

						{(imageIcon || showIconCheckmark) && (
							<div
								className={cn(
									'absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-solid border-white bg-primary-violet text-white transition duration-200',
									isChecked && 'border-light-grey',
									withTouchState && 'group-active:border-on-white-hover',
									withClickState && 'group-hover:border-on-white-hover group-active:border-on-white-active',
								)}
							>
								{imageIcon && !isBoolean(imageIcon) && styleElement(imageIcon, 'size-2.5')}
								{showIconCheckmark && <Icon type='check' className='size-2.5' />}
							</div>
						)}
					</div>
				)}

				<div className='min-w-0 flex-1 self-center'>
					<div
						className={cn('truncate font-medium', isNameText && 'font-normal', isDestructiveMenuItem && 'text-red-600')}
					>
						{name}
					</div>
					{description && <div className='truncate text-sm font-light text-primary-grey'>{description}</div>}
				</div>

				{(rightName || rightDescription) && (
					<div
						className={cn('ml-2 flex flex-shrink-0 flex-col items-end', description ? 'self-stretch' : 'self-center')}
					>
						{rightName && <div className={cn(isMenuItem && 'font-light text-primary-grey')}>{rightName}</div>}
						{rightDescription && <div className='text-sm font-light text-primary-grey'>{rightDescription}</div>}
					</div>
				)}

				{(rightNode || showRightCheckmark) && (
					<div className='ml-2 flex-shrink-0 self-center'>
						{rightNode}
						{showRightCheckmark && <Icon type='check' className='flex size-4 self-center text-primary-violet' />}
					</div>
				)}
			</div>
		</div>
	);
}
