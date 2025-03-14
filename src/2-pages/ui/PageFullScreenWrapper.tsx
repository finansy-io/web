import {Outlet} from 'react-router-dom';

export function PageFullScreenWrapper() {
	return (
		<div role='screen-layout' className='mx-auto flex min-h-screen max-w-[33rem] flex-col'>
			<Outlet />
		</div>
	);
}
