import {clickableTitleStyles, touchableTitleStyles} from '../../styles/CardSlots.styles.ts';
import {Button, type ButtonProps, Icon} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';

export function CardTitleButton({onClick}: {onClick: ButtonProps['onClick']}) {
	const {isTouchable, isClickable} = useResponsive();

	return (
		<Button
			type='icon'
			onClick={onClick}
			className={cn(
				'group transition duration-200',
				isTouchable && touchableTitleStyles,
				isClickable && cn(clickableTitleStyles, '-mx-1.5 rounded-full px-1.5'),
			)}
			icon={<Icon type='plus' className={cn('size-3.5 text-primary-grey', isTouchable && 'group-active:text-black')} />}
		/>
	);
}
