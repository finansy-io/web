import {Outlet} from 'react-router-dom';
import {AppHeader} from './AppHeader.tsx';
import {AppTabs} from './AppTabs.tsx';
import {AppNavbar} from './AppNavbar.tsx';
import {cn} from '@shared/lib';

export function AppLayout() {
	const isMobile = false;
	const isDesktop = false;

	return (
		<div
			role='list-page-layout'
			className={cn('mx-auto flex min-h-screen max-w-[33rem] flex-col', isDesktop && 'flex justify-between px-6 py-8')}
		>
			<AppHeader />

			{isDesktop && <AppNavbar />}

			<div role='app-content' className='flex w-full flex-1 flex-col'>
				<AppTabs />

				<Outlet />
			</div>

			{isMobile && <AppNavbar />}
		</div>
	);
}
