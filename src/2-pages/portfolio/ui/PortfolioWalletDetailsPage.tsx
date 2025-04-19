import {PageWidgetsWrapper} from '@pages/ui';
import {WalletDelete, WalletHeader} from '@widgets/wallet';

export function PortfolioWalletDetailsPage() {
	return (
		<>
			<WalletHeader />
			<PageWidgetsWrapper>
				<WalletDelete />
			</PageWidgetsWrapper>
		</>
	);
}
