import {useNavigate} from 'react-router-dom';
import {type CardLinkTitleProps} from '../types/CardLinkTitle.types';
import {Icon} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';

export function CardLinkTitle(props: CardLinkTitleProps) {
	const {title, path} = props;

	const navigate = useNavigate();

	const {isMobile, isTablet, isDesktop} = useResponsive();

	return (
		<div
			className={cn(
				'-m-[3px] flex w-fit cursor-pointer items-center gap-1 p-[3px] transition duration-200',
				(isMobile || isTablet) && 'text-black',
				isDesktop && '-mx-2.5 -my-1.5 rounded-[14px] px-2.5 py-1.5 hover:bg-on-white-hover active:bg-on-white-active',
			)}
			onClick={() => navigate(path)}
		>
			<div>{title}</div>
			<div>
				<Icon type='chevronRight' className='size-2.5 text-primary-grey' />
			</div>
		</div>
	);
}
