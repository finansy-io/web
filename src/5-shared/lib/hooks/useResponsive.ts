import {useMediaQuery} from '@mui/material';

export function useResponsive() {
	const isMobile = useMediaQuery('(max-width: 767px)');
	const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	const isTouchState = isMobile || isTablet;
	const isClickState = isDesktop;

	return {isMobile, isTablet, isDesktop, isTouchState, isClickState};
}
