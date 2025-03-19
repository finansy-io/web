import {Icon, type ManagementSettingsConfigs} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export const settingsConfigs = [
	[
		{
			name: 'Currency',
			image: <Icon type='currency' className='size-5 text-[18px]' />,
			rightNode: <div className='font-light text-primary-grey'>USD</div>,
		},
		{
			name: 'Hide balance',
			image: <Icon type='hide' className='size-5 text-[18px]' />,
			rightNode: 'switch',
		},
		{
			name: 'Include in total portfolio',
			image: <Icon type='portfolio' className='size-5' />,
			rightNode: 'switch',
		},
	],

	[
		{
			name: 'Connected wallets',
			image: <Icon type='wallet' className='size-5' />,
			onClick: ({navigate}) => {
				navigate(APP_PATH.wallet.list, {state: {from: APP_PATH.portfolio.list}});
			},
		},
		// {
		// 	name: 'Connected exchanges',
		// 	image: <Icon type='wallet' className='size-5' />,
		// 	onClick: ({navigate}) => {
		// 		navigate(APP_PATH.wallet.list, {state: {from: APP_PATH.portfolio.list}});
		// 	},
		// },
	],
	[
		{
			name: APP_TEXT.share + ' ' + APP_TEXT.portfolio.toLowerCase(),
			image: <Icon type='share' className='size-5' />,
			onClick: () => console.log('delete portfolio'),
		},
		{
			name: APP_TEXT.edit + ' ' + APP_TEXT.portfolio.toLowerCase(),
			image: <Icon type='edit' className='size-5' />,
			onClick: () => console.log('edit portfolio'),
		},
		{
			name: <div className='text-red-600'>{APP_TEXT.delete + ' ' + APP_TEXT.portfolio.toLowerCase()}</div>,
			image: <Icon type='delete' className='size-5 text-red-600' />,
			onClick: () => console.log('delete portfolio'),
		},
	],
] as ManagementSettingsConfigs;

export const portfolioConfigs = [
	{
		name: 'Portfolio 1',
		description: '10 assets',
		rightName: '9 990 $',
		rightDescription: (
			<div className='flex items-center gap-1.5 text-red-600'>
				<div>-7 631$</div>
				<div className='size-0.5 rounded-full bg-red-600' />
				<div>78.91%</div>
			</div>
		),
		image: <Icon type='portfolio' withBackground />,
	},
	{
		name: 'Portfolio 2',
		description: '12 assets',
		rightName: '8 865 $',
		rightDescription: (
			<div className='flex items-center gap-1.5 text-red-600'>
				<div>-2 947$</div>
				<div className='size-0.5 rounded-full bg-red-600' />
				<div>56.78%</div>
			</div>
		),
		image: <Icon type='portfolio' withBackground />,
	},
	{
		name: 'Portfolio 3',
		description: '11 assets',
		rightName: '6 798 $',
		rightDescription: (
			<div className='flex items-center gap-1.5 text-red-600'>
				<div>-765$</div>
				<div className='size-0.5 rounded-full bg-red-600' />
				<div>32.21%</div>
			</div>
		),
		image: <Icon type='portfolio' withBackground />,
	},
];

// const tabConfigs = [
// 	{name: '24h', path: '24h'},
// 	{name: '1w', path: '1w'},
// 	{name: '1m', path: '1m'},
// 	{name: '3m', path: '3m'},
// 	{name: '6m', path: '6m'},
// 	{name: '1y', path: '1y'},
// 	{name: 'All', path: 'All'},
// ];

export const appTabConfigs: {label: string; path: string}[] = [
	{label: APP_TEXT.assets, path: APP_PATH.portfolio.list},
	{label: APP_TEXT.goals, path: APP_PATH.goal.list},
];

export const sidebarConfigs = [
	{
		label: 'Home',
		path: '/',
		icon: <div>Home</div>,
	},
	{
		label: 'Tracker',
		path: '/',
		icon: <div>Home</div>,
	},
	{
		label: 'Invest',
		path: '/',
		icon: <div>Home</div>,
	},
	{
		label: 'Calculator',
		path: '/',
		icon: <div>Home</div>,
	},
];
