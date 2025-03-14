import {PageWidgetsWrapper} from '@pages/ui';
import {PortfolioWalletDelete, PortfolioWalletDetails, PortfolioWalletHeader} from '@widgets/portfolio';

export function PortfolioWalletDetailsPage() {
	return (
		<>
			<PortfolioWalletHeader />
			<PageWidgetsWrapper>
				<PortfolioWalletDetails />
				<PortfolioWalletDelete />
			</PageWidgetsWrapper>
		</>
	);
}
