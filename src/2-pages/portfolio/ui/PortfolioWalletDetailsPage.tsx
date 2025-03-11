import {PageWidgetsWrapper} from '@pages/ui';
import {PortfolioWalletDetails, PortfolioWalletHeader} from '@widgets/portfolio';

export function PortfolioWalletDetailsPage() {
	return (
		<>
			<PortfolioWalletHeader />
			<PageWidgetsWrapper>
				<PortfolioWalletDetails />
			</PageWidgetsWrapper>
		</>
	);
}
