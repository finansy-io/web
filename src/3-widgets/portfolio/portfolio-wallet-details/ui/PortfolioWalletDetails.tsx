import {useState} from 'react';
import {getDetailsFields} from '../config/PortfolioWalletDetails.config.tsx';
import {DeleteItem, deleteItemConfirmation, Details} from '@shared/ui';
import {useCopy} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';

export function PortfolioWalletDetails() {
	const [isSuccess, setIsSuccess] = useState(false);

	const {isCopied, copy} = useCopy();

	function handleDelete() {
		setIsSuccess(true);
	}

	const details = {
		address: '0x6C7eA518F0eb7066e56CFe667D87c0cD900E034B',
	};
	const isLoading = false;
	const isPending = false;
	const isError = false;
	const walletName = 'Metamask memes';
	const portfolioName = 'Portfolio 1';

	return (
		<>
			<Details details={details} detailsFields={getDetailsFields(isCopied, copy)} isLoading={isLoading} />
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
		</>
	);
}
