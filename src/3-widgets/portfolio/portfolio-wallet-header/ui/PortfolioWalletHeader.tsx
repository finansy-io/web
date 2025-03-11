import {useLocation} from 'react-router-dom';
import {walletHeaderButtonConfigs} from '../config/PortfolioWalletHeader.config.tsx';
import {APP_PATH} from '@shared/constants';
import {Header, Icon} from '@shared/ui';

export function PortfolioWalletHeader() {
	const walletName = 'Metamask memes';

	const location = useLocation();

	return (
		<Header
			title={walletName}
			buttonConfigs={walletHeaderButtonConfigs}
			backPath={location.state?.from === APP_PATH.portfolio.list ? APP_PATH.portfolio.list : APP_PATH.portfolio.wallets}
			image={<Icon type='wallet' withBackground />}
		/>
	);
}
