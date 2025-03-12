import {ReactNode} from 'react';
import {cn, useResponsive} from '@shared/lib';

export function PageActionButtonWrapper({children}: {children: ReactNode}) {
	const {isMobile} = useResponsive();

	return <div className={cn('p-4 pt-2', !isMobile && 'w-96 self-center')}>{children}</div>;
}
