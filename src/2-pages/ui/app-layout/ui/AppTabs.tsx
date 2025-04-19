import {useRef, useLayoutEffect, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {appTabConfigs} from '../config/AppLayout.config.tsx';
import {cn, useResponsive} from '@shared/lib';

/**
 * With x animation
 * */

export function AppTabs() {
	const location = useLocation();
	const navigate = useNavigate();
	const containerRef = useRef<HTMLDivElement>(null);
	const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
	const {isMobile, isTablet, isDesktop} = useResponsive();

	const [animateHighlight, setAnimateHighlight] = useState(false);
	const [highlight, setHighlight] = useState({left: 0, top: 0, width: 0, height: 0});

	const updateHighlight = () => {
		const container = containerRef.current;
		if (!container) return;
		const activeIndex = appTabConfigs.findIndex((tab) => tab.path === location.pathname);
		const activeEl = tabRefs.current[activeIndex];
		if (activeEl) {
			const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = activeEl;
			setHighlight({left: offsetLeft, top: offsetTop, width: offsetWidth, height: offsetHeight});
		}
	};

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const activeIndex = appTabConfigs.findIndex((tab) => tab.path === location.pathname);
		const activeEl = tabRefs.current[activeIndex];
		if (activeEl) {
			if (container.scrollWidth > container.clientWidth) {
				const tabLeft = activeEl.offsetLeft;
				const tabRight = tabLeft + activeEl.offsetWidth;
				const visibleLeft = container.scrollLeft;
				const visibleRight = visibleLeft + container.clientWidth;
				if (tabLeft < visibleLeft || tabRight > visibleRight) {
					activeEl.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'});
				}
			}
			updateHighlight();
		}
	}, [location.pathname, isMobile, isTablet, isDesktop]);

	useEffect(() => {
		const id = requestAnimationFrame(() => setAnimateHighlight(true));
		return () => cancelAnimationFrame(id);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', updateHighlight);
		return () => window.removeEventListener('resize', updateHighlight);
	}, []);

	return (
		<div
			ref={containerRef}
			className='scrollbar-hide relative flex gap-2 overflow-x-auto px-4 pb-4'
			style={{scrollPaddingInline: '16px'}}
		>
			<div
				className={cn('absolute z-0 rounded-3xl bg-white', animateHighlight && 'transition-all duration-300')}
				style={{
					left: highlight.left,
					top: highlight.top,
					width: highlight.width,
					height: highlight.height,
				}}
			/>

			{appTabConfigs.map(({name, path}, index) => {
				const isActive = location.pathname === path;
				return (
					<div
						key={index}
						ref={(el) => (tabRefs.current[index] = el)}
						className={cn(
							'relative cursor-pointer rounded-3xl bg-inherit px-4 py-2 text-sm transition-none',
							isActive ? 'text-black' : 'text-primary-grey',
							!isActive && isDesktop && 'hover:bg-on-grey-hover active:bg-on-grey-active',
						)}
						onClick={() => navigate(path)}
					>
						{name}
					</div>
				);
			})}
		</div>
	);
}

/**
 * With disappear animation
 * */
// export function AppTabs() {
// 	const location = useLocation();
// 	const navigate = useNavigate();
//
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
//
// 	const {isMobile, isTablet, isDesktop} = useResponsive();
//
// 	useEffect(() => {
// 		const container = containerRef.current;
// 		if (!container) return;
//
// 		// Проверяем, есть ли overflow вообще
// 		if (container.scrollWidth <= container.clientWidth) return;
//
// 		const activeIndex = appTabConfigs.findIndex((tab) => tab.path === location.pathname);
// 		const activeTabEl = tabRefs.current[activeIndex];
// 		if (!activeTabEl) return;
//
// 		// Проверяем, полностью ли таб видим в контейнере
// 		const tabLeft = activeTabEl.offsetLeft;
// 		const tabRight = tabLeft + activeTabEl.offsetWidth;
// 		const scrollLeft = container.scrollLeft;
// 		const visibleLeft = scrollLeft;
// 		const visibleRight = scrollLeft + container.clientWidth;
//
// 		if (tabLeft < visibleLeft || tabRight > visibleRight) {
// 			// Скролл при необходимости, учитывая padding
// 			activeTabEl.scrollIntoView({
// 				behavior: 'smooth',
// 				block: 'nearest',
// 				inline: 'start',
// 			});
// 		}
// 	}, [location.pathname]);
//
// 	return (
// 		<div
// 			ref={containerRef}
// 			className='scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-4'
// 			style={{scrollPaddingInline: '16px'}}
// 		>
// 			{appTabConfigs.map(({name, path}, index) => (
// 				<div
// 					key={index}
// 					ref={(el) => (tabRefs.current[index] = el)}
// 					className={cn(
// 						'rounded-3xl px-4 py-2 text-sm transition',
// 						location.pathname === path ? 'bg-white' : 'cursor-pointer bg-inherit text-primary-grey',
// 						(isMobile || isTablet) && 'active:text-black',
// 						isDesktop && location.pathname !== path && 'hover:bg-on-grey-hover active:bg-on-grey-active',
// 					)}
// 					onClick={() => navigate(path)}
// 				>
// 					{name}
// 				</div>
// 			))}
// 		</div>
// 	);
// }
