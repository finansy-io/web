import {useState} from 'react';
import {getDetailsFields, type DetailsFieldProps} from '../config/PortfolioWalletEdit.config.tsx';
import {Details, StatusPopup} from '@shared/ui';

export function PortfolioWalletEdit() {
	const details = {
		name: 'Metamask memes',
		address: '0x6C7eA518F0eb7066e56CFe667D87c0cD900E034B',
	};

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const isLoading = false;
	const isError = false;
	const isPending = false;

	const detailsFieldProps: DetailsFieldProps = {
		isPending,
		isSuccess,
		isError,
		handleUpdate: (value: string) => setIsSuccess(!!value),
	};

	return (
		<>
			<Details details={details} detailsFields={getDetailsFields(detailsFieldProps)} isLoading={isLoading} />

			<StatusPopup isOpen={isSuccess} status='success' statusTextKey='updateWalletSuccess' />
			<StatusPopup isOpen={isError} status='error' statusTextKey='updateWalletError' />
		</>
	);
}
