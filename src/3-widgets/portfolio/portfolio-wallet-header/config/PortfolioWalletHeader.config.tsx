import {ButtonConfig, Icon} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export const walletHeaderButtonConfigs = [
	{
		name: APP_TEXT.edit,
		type: 'secondary',
		icon: <Icon type='edit' />,
		onClick: ({navigate}) => navigate(APP_PATH.portfolio.getItemWalletEditPath('1')),
	},
] as ButtonConfig[];
