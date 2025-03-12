import {PageWidgetsWrapper} from '@pages/ui';
import {PortfolioWalletEdit} from '@widgets/portfolio';
import {Header} from '@shared/ui';

export function PortfolioWalletEditPage() {
	return (
		<>
			<Header />
			<PageWidgetsWrapper>
				<PortfolioWalletEdit />
			</PageWidgetsWrapper>
		</>
	);
}
