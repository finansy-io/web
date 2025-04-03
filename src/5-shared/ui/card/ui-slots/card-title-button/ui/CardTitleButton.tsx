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
				'transition duration-200',
				isTouchable && touchableTitleStyles,
				isTouchable && 'text-black',
				isClickable && clickableTitleStyles,
			)}
			icon={<Icon type='plus' className='size-3.5 text-primary-grey' />}
		/>
	);
}
