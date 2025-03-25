export function AppNavbar() {
	return (
		<div
			role='app-navbar'
			className='fixed bottom-0 flex w-full justify-center gap-2 border-t border-secondary-grey bg-[rgba(0,0,0)/0.8] p-2 backdrop-blur-lg'
		>
			<div className='rounded-2xl bg-secondary-grey p-4'>Portfolio</div>
			<div className='rounded-2xl bg-secondary-grey p-4'>Alerts</div>
			<div className='rounded-2xl bg-secondary-grey p-4'>Watchlist</div>
		</div>
	);

	// when isDesktop
	// return (
	// 	<div role='app-navbar' className='w-52'>
	// 		<div className='mb-12 flex pl-4 text-2xl font-bold'>
	// 			<Icon type='user' />
	// 		</div>
	//
	// 		{/* APP LOGO */}
	// 		<div>Finansy</div>
	//
	// 		<nav>
	// 			{sidebarConfigs.map(({label, path, icon}, index) => (
	// 				<div
	// 					className={cn(
	// 						'flex cursor-pointer rounded-2xl px-4 py-3 hover:bg-secondary-grey',
	// 						index === 0 && 'bg-white',
	// 					)}
	// 					key={label + path}
	// 					onClick={() => alert(label + ' module')}
	// 				>
	// 					<div className={cn('mr-4')}>{icon}</div>
	// 					<div className={cn('font-medium text-primary-grey', index === 0 && 'text-primary-violet')}>{label}</div>
	// 				</div>
	// 			))}
	// 		</nav>
	// 	</div>
	// );
}
