import {useNavigate} from 'react-router-dom';
import {type CardLinkTitleProps} from '../types/CardLinkTitle.types.ts';
import {clickableTitleStyles, touchableTitleStyles} from '../../styles/CardSlots.styles.ts';
import {Icon} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';

export function CardLinkTitle(props: CardLinkTitleProps) {
	const {title, path} = props;

	const navigate = useNavigate();

	const {isTouchable, isClickable} = useResponsive();

	return (
		<div
			className={cn(
				'group flex cursor-pointer items-center gap-1 transition duration-200',
				isTouchable && touchableTitleStyles,
				isClickable && clickableTitleStyles,
			)}
			onClick={() => navigate(path)}
		>
			<div>{title}</div>
			<div>
				<Icon
					type='chevronRight'
					className={cn('size-2.5 text-primary-grey transition duration-200', isTouchable && 'group-active:text-black')}
				/>
			</div>
		</div>
	);
}
