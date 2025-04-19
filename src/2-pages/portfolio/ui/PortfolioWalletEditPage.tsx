import {useParams} from 'react-router-dom';
import {PageWidgetsWrapper} from '@pages/ui';
import {WalletEdit} from '@widgets/wallet';
import {Header} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function PortfolioWalletEditPage() {
	const {id} = useParams();

	return (
		<>
			<Header
				backPath={APP_PATH.portfolio.getWalletDetailsPath(id)}
				title={`${APP_TEXT.edit} ${APP_TEXT.wallet.toLowerCase()}`}
			/>
			<PageWidgetsWrapper>
				<WalletEdit />
			</PageWidgetsWrapper>
		</>
	);
}
