import {DeleteItem, deleteItemConfirmation} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {useState} from 'react';

export function PortfolioWalletDelete() {
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
			confirmationText={deleteItemConfirmation.disconnectWallet(portfolioName)}
			isPending={isPending}
			isSuccess={isSuccess}
			isError={isError}
			actionButtonText={APP_TEXT.disconnect}
			handleDelete={handleDelete}
			successStatusTextKey='disconnectWalletSuccess'
			errorStatusTextKey='disconnectWalletError'
		>
			{`${APP_TEXT.disconnect} ${APP_TEXT.wallet.toLowerCase()}`}
		</DeleteItem>
	);
}
