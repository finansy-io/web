import {useLocation, useNavigate} from 'react-router-dom';
import {appTabConfigs} from '../config/AppLayout.config.tsx';
import {cn} from '@shared/lib';

export function AppTabs() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className='flex gap-2 px-4 pb-4'>
			{appTabConfigs.map(({name, path}, index) => (
				<div
					key={index}
					className={cn(
						'cursor-pointer rounded-3xl px-4 py-2 text-sm transition duration-200',
						location.pathname === path ? 'bg-white' : 'bg-inherit text-primary-grey',
					)}
					onClick={() => navigate(path)}
				>
					{name}
				</div>
			))}
		</div>
	);
}
