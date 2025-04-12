import {useLocation} from 'react-router-dom';
import {WalletHeaderConfig} from '../config/WalletHeader.config.tsx';
import {Header, Icon} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {DateService} from '@shared/lib';

export function WalletHeader() {
	const walletName = 'Phantom memes';

	const location = useLocation();

	return (
		<Header
			title={walletName}
			subDescription={APP_TEXT.connected + ' ' + new DateService().getLocalDateString()}
			buttonConfigs={WalletHeaderConfig.getButtonConfig()}
			backPath={location.state?.from === APP_PATH.portfolio.list ? APP_PATH.portfolio.list : APP_PATH.wallet.list}
			image={<Icon type='wallet' withBackground />}
		/>
	);
}
