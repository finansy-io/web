import {PageWidgetsWrapper} from '@pages/ui';
import {PortfolioWalletList} from '@widgets/portfolio';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {Header} from '@shared/ui';

export function PortfolioWalletListPage() {
	return (
		<>
			<Header title={APP_TEXT.connectedWallets} backPath={APP_PATH.portfolio.list} />
			<PageWidgetsWrapper>
				<PortfolioWalletList />
			</PageWidgetsWrapper>
		</>
	);
}
