import {useNavigate} from 'react-router-dom';
import {type CardLinkTitleProps} from '../types/CardLinkTitle.types.ts';
import {Icon} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';

export function CardLinkTitle(props: CardLinkTitleProps) {
	const {title, path} = props;

	const navigate = useNavigate();

	const {isMobile, isTablet, isDesktop} = useResponsive();

	return (
		<div
			className={cn(
				'group -m-[3px] flex w-fit cursor-pointer items-center gap-1 p-[3px] transition duration-200',
				(isMobile || isTablet) && 'active:text-black',
				isDesktop && '-mx-2.5 -my-1.5 rounded-[14px] px-2.5 py-1.5 hover:bg-on-white-hover active:bg-on-white-active',
			)}
			onClick={() => navigate(path)}
		>
			<div>{title}</div>
			<div>
				<Icon
					type='chevronRight'
					className={cn(
						'size-2.5 text-primary-grey transition duration-200',
						(isMobile || isTablet) && 'group-active:text-black',
					)}
				/>
			</div>
		</div>
	);
}
