import {useParams} from 'react-router-dom';
import {PageWidgetsWrapper} from '@pages/ui';
import {WalletEdit} from '@widgets/wallet';
import {Header} from '@shared/ui';
import {APP_PATH} from '@shared/constants';

export function WalletEditPage() {
	const {id} = useParams();

	return (
		<>
			<Header backPath={APP_PATH.wallet.getItemDetailsPath(id)} />
			<PageWidgetsWrapper>
				<WalletEdit />
			</PageWidgetsWrapper>
		</>
	);
}
