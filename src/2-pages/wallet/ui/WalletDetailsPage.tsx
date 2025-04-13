import {PageWidgetsWrapper} from '@pages/ui';
import {WalletDelete, WalletHeader} from '@widgets/wallet';

export function WalletDetailsPage() {
	return (
		<>
			<WalletHeader />
			<PageWidgetsWrapper>
				<WalletDelete />
			</PageWidgetsWrapper>
		</>
	);
}
