import {useState} from 'react';
import {DeleteItem} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

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
		<DeleteItem
			confirmationTitle={walletName}
			confirmationDescription={APP_TEXT.confirmation.disconnectWallet(portfolioName)}
			isPending={isPending}
			isSuccess={isSuccess}
			isError={isError}
			actionButtonText={APP_TEXT.disconnect}
			handleDelete={handleDelete}
			statusTextKey='disconnectWallet'
		>
			{`${APP_TEXT.disconnect} ${APP_TEXT.wallet.toLowerCase()}`}
		</DeleteItem>
	);
}
