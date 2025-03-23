import {APP_PATH, APP_TEXT} from '@shared/constants';
import {type ButtonConfig, Icon} from '@shared/ui';

export const buttonConfigs = [
	{
		name: APP_TEXT.connectWallet,
		type: 'secondary',
		icon: <Icon type='plus' />,
		onClick: ({navigate}) => navigate(APP_PATH.wallet.connectWallet),
	},
] as ButtonConfig[];

export const assetSortingOptions = [
	{name: 'By holdings (highest / lowest)', value: 1},
	{name: 'By invest amount (highest / lowest)', value: 2},
	{name: 'By market cap (highest / lowest)', value: 3}, // в delta просто cap
	{name: 'By percentage (gainers / losers)', value: 4}, // которые в процентах больше всего принесли, relative gainers
	{name: 'By money (gainers / losers)', value: 5}, // которые в деньгах больше всего принесли, absolute gainers
];
