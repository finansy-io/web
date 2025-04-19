import {useRef, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {appTabConfigs} from '../config/AppLayout.config.tsx';
import {cn, useResponsive} from '@shared/lib';

export function AppTabs() {
	const location = useLocation();
	const navigate = useNavigate();

	const containerRef = useRef<HTMLDivElement>(null);
	const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

	const {isMobile, isTablet, isDesktop} = useResponsive();

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Проверяем, есть ли overflow вообще
		if (container.scrollWidth <= container.clientWidth) return;

		const activeIndex = appTabConfigs.findIndex((tab) => tab.path === location.pathname);
		const activeTabEl = tabRefs.current[activeIndex];
		if (!activeTabEl) return;

		// Проверяем, полностью ли таб видим в контейнере
		const tabLeft = activeTabEl.offsetLeft;
		const tabRight = tabLeft + activeTabEl.offsetWidth;
		const scrollLeft = container.scrollLeft;
		const visibleLeft = scrollLeft;
		const visibleRight = scrollLeft + container.clientWidth;

		if (tabLeft < visibleLeft || tabRight > visibleRight) {
			// Скролл при необходимости, учитывая padding
			activeTabEl.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start',
			});
		}
	}, [location.pathname]);

	return (
		<div
			ref={containerRef}
			className='scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-4'
			style={{scrollPaddingInline: '16px'}}
		>
			{appTabConfigs.map(({name, path}, index) => (
				<div
					key={index}
					ref={(el) => (tabRefs.current[index] = el)}
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
