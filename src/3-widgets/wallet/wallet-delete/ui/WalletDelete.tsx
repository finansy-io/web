import {useState} from 'react';
import {DestructItem} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function WalletDelete() {
	const [isSuccess, setIsSuccess] = useState(false);

	const isPending = false;
	const isError = false;
	const walletName = 'Metamask memes';
	const portfolioName = 'Portfolio 1';

	function handleDelete() {
		setIsSuccess(true);
	}

	return (
		<DestructItem
			confirmationTitle={walletName}
			confirmationDescription={APP_TEXT.confirmation.disconnectWallet(portfolioName)}
			isPending={isPending}
			isSuccess={isSuccess}
			isError={isError}
			destructButtonText={APP_TEXT.disconnect}
			onDestruct={handleDelete}
			onStatusPopupDismiss={(navigate) => navigate(APP_PATH.wallet.list)}
			statusTextKey='disconnectWallet'
		>
			{`${APP_TEXT.disconnect} ${APP_TEXT.wallet.toLowerCase()}`}
		</DestructItem>
	);
}
