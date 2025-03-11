import {DeleteItem, deleteItemConfirmation, Details, Icon} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {useState} from 'react';

const detailsFields = [
	{
		label: 'Address',
		node: (
			<div className='flex items-center gap-1.5' onClick={() => alert('Copied')}>
				<div>0x8193921...2348H6lsk</div>
				<div>
					<Icon type='copy' />
				</div>
			</div>
		),
	},
];

export function PortfolioWalletDetails() {
	const isLoading = false;

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	function handleDelete() {
		setIsSuccess(true);
	}

	const isPending = false;
	const isError = false;
	const walletName = 'Metamask memes';
	const portfolioName = 'Portfolio 1';

	return (
		<>
			<Details detailsFields={detailsFields} isLoading={isLoading} />
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
