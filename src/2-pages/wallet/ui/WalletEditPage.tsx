import {PageWidgetsWrapper} from '@pages/ui';
import {WalletEdit} from '@widgets/wallet';
import {Header} from '@shared/ui';

export function WalletEditPage() {
	return (
		<>
			<Header />
			<PageWidgetsWrapper>
				<WalletEdit />
			</PageWidgetsWrapper>
		</>
	);
}
