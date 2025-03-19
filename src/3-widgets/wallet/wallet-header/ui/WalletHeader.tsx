import {useLocation} from 'react-router-dom';
import {WalletHeaderConfig} from '../config/WalletHeader.config.tsx';
import {Header, Icon} from '@shared/ui';
import {APP_PATH} from '@shared/constants';

export function WalletHeader() {
	const walletName = 'Metamask memes';

	const location = useLocation();

	return (
		<Header
			title={walletName}
			buttonConfigs={WalletHeaderConfig.getButtonConfig()}
			backPath={location.state?.from === APP_PATH.portfolio.list ? APP_PATH.portfolio.list : APP_PATH.wallet.list}
			image={<Icon type='wallet' withBackground />}
		/>
	);
}
