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
	} = props;

	const navigate = useNavigate();

	const {isDesktop} = useResponsive();

	const showIconCheckmark = isChecked && image;
	const showRightCheckmark = isChecked && !image;

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
					onClick && isDesktop
						? 'group-hover:bg-on-white-hover group-active:bg-on-white-active'
						: 'group-active:bg-on-white-hover',
					isChecked && 'bg-light-grey',
					className,
				)}
			>
				{leftNode && <div className='mr-4 flex flex-shrink-0 items-center'>{leftNode}</div>}

				{image && (
					<div className='relative my-0.5 mr-4 flex-shrink-0'>
						{image}

						{(imageIcon || showIconCheckmark) && (
							<div
								className={cn(
									'absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-solid border-white bg-primary-violet text-white transition duration-200 group-active:border-on-grey-active',
									isChecked && 'border-light-grey',
									isDesktop && 'group-hover:border-light-grey',
								)}
							>
								{imageIcon && !isBoolean(imageIcon) && styleElement(imageIcon, 'size-2.5')}
								{showIconCheckmark && <Icon type='check' className='size-2.5' />}
							</div>
						)}
					</div>
				)}

				<div className='min-w-0 flex-1 self-center'>
					<div className={cn('truncate font-medium', isNameText && 'font-normal')}>{name}</div>
					{description && <div className='truncate text-sm font-light text-primary-grey'>{description}</div>}
				</div>

				{(rightName || rightDescription) && (
					<div
						className={cn('ml-2 flex flex-shrink-0 flex-col items-end', description ? 'self-stretch' : 'self-center')}
					>
						{rightName && <div>{rightName}</div>}
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
