import {useLocation, useNavigate} from 'react-router-dom';
import {appTabConfigs} from '../config/AppLayout.config.tsx';
import {cn, useResponsive} from '@shared/lib';

export function AppTabs() {
	const location = useLocation();
	const navigate = useNavigate();

	const {isMobile, isTablet, isDesktop} = useResponsive();

	return (
		<div className='flex gap-2 px-4 pb-4'>
			{appTabConfigs.map(({name, path}, index) => (
				<div
					key={index}
					className={cn(
						'rounded-3xl px-4 py-2 text-sm transition',
						location.pathname === path ? 'bg-white' : 'cursor-pointer bg-inherit text-primary-grey',
						(isMobile || isTablet) && 'active:text-black',
						isDesktop && location.pathname !== path && 'hover:bg-on-grey-hover active:bg-on-grey-active',
					)}
					onClick={() => navigate(path)}
				>
					{name}
				</div>
			))}
		</div>
	);
}
