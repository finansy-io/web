import {Button, type ButtonProps, Icon} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';

export function CardButtonTitle({onClick}: {onClick: ButtonProps['onClick']}) {
	const {isMobile, isTablet, isDesktop} = useResponsive();

	return (
		<Button
			type='icon'
			onClick={onClick}
			className={cn(
				'-m-[3px] p-[3px] transition duration-200',
				isMobile && isTablet && 'text-black',
				isDesktop && 'hover:bg-on-white-hover active:bg-on-white-active',
			)}
			icon={<Icon type='plus' className='size-3.5 text-primary-grey' />}
		/>
	);
}
