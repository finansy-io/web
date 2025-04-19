import {useRef, useLayoutEffect, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {appTabConfigs} from '../config/AppLayout.config.tsx';
import {cn, useResponsive} from '@shared/lib';

export function AppTabs() {
	const location = useLocation();
	const navigate = useNavigate();

	const {isTouchable, isClickable} = useResponsive();

	const containerRef = useRef<HTMLDivElement>(null);
	const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

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
	}, [location.pathname, isTouchable, isClickable]);

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
							'relative cursor-pointer rounded-3xl bg-inherit px-4 py-2 text-sm transition duration-200',
							isActive ? 'text-black' : 'text-primary-grey',
							!isActive && isTouchable && 'active:text-black',
							!isActive && isClickable && 'hover:bg-on-grey-hover active:bg-on-grey-active',
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
