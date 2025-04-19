import {Icon, type HeaderButtonConfig} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export class WalletHeaderConfig {
	static getButtonConfig(): HeaderButtonConfig[] {
		return [
			{
				name: APP_TEXT.edit,
				type: 'secondary',
				icon: <Icon type='edit' />,
				onClick: ({navigate}) => {
					navigate(APP_PATH.portfolio.getWalletEditPath('1'));
				},
			},
		];
	}
}
