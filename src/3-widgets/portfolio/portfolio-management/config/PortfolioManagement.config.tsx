import {type ButtonConfig, Icon} from '@shared/ui';
import {type SortingSelectOptions} from '@shared/types';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export const buttonConfigs = [
	{
		name: APP_TEXT.connectWallet,
		type: 'secondary',
		icon: <Icon type='plus' />,
		onClick: ({navigate}) => navigate(APP_PATH.wallet.connectWallet),
	},
] as ButtonConfig[];

export const assetSortingOptions = [
	{
		name: APP_TEXT.holdings,
		descValue: 1,
		ascValue: 2,
	},
	{
		name: APP_TEXT.investAmount,
		descValue: 3,
		ascValue: 4,
	},
	{
		name: APP_TEXT.marketCap,
		descValue: 5,
		ascValue: 6,
	},
	{
		name: APP_TEXT.percentage,
		descValue: 7,
		ascValue: 8,
	},
	{
		name: APP_TEXT.money,
		descValue: 9,
		ascValue: 10,
	},
	{
		name: APP_TEXT.alphabetical,
		descValue: 11,
		ascValue: 12,
		descDescription: APP_TEXT.aToZ,
		ascDescription: APP_TEXT.zToA,
	},
] as SortingSelectOptions<number>;
