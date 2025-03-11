import {walletHeaderButtonConfigs} from '../config/PortfolioWalletHeader.config.tsx';
import {APP_PATH} from '@shared/constants';
import {Header, Icon} from '@shared/ui';

export function PortfolioWalletHeader() {
	const walletName = 'Metamask memes';

	return (
		<Header
			title={walletName}
			buttonConfigs={walletHeaderButtonConfigs}
			backPath={APP_PATH.portfolio.wallets}
			image={<Icon type='wallet' withBackground />}
		/>
	);
}
