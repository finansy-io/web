import {PageWidgetsWrapper} from '@pages/ui';
import {WalletList} from '@widgets/wallet';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {Header} from '@shared/ui';

export function WalletListPage() {
	return (
		<>
			<Header title={APP_TEXT.connectedWallets} backPath={APP_PATH.portfolio.list} />
			<PageWidgetsWrapper>
				<WalletList />
			</PageWidgetsWrapper>
		</>
	);
}
