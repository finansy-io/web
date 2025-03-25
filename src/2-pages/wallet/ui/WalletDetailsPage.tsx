import {PageWidgetsWrapper} from '@pages/ui';
import {WalletDelete, WalletDetails, WalletHeader} from '@widgets/wallet';

export function WalletDetailsPage() {
	return (
		<>
			<WalletHeader />
			<PageWidgetsWrapper>
				<WalletDetails />
				<WalletDelete />
			</PageWidgetsWrapper>
		</>
	);
}
