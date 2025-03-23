import {Icon} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {type SettingsConfigs, TabConfigs} from '@shared/types';

export const settingsConfigs = [
	[
		// {
		// 	name: 'Currency',
		// 	image: <Icon type='currency' className='size-5 text-[18px]' />,
		// 	rightNode: <div className='font-light text-primary-grey'>USD</div>,
		// },
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
] as SettingsConfigs;

export const appTabConfigs = [
	{label: APP_TEXT.assets, path: APP_PATH.portfolio.list},
	{label: APP_TEXT.goals, path: APP_PATH.goal.list},
] satisfies TabConfigs;

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
