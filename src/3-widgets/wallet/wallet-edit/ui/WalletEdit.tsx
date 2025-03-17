import {useState} from 'react';
import {WalletEditConfig} from '../config/WalletEdit.config.tsx';
import {WalletEditDetailsFieldProps} from '../types/WalletEdit.types.ts';
import {Details, StatusPopup} from '@shared/ui';

export function WalletEdit() {
	const details = {
		name: 'Metamask memes',
		address: '0x6C7eA518F0eb7066e56CFe667D87c0cD900E034B',
	};

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const isLoading = false;
	const isError = false;
	const isPending = false;

	const detailsFieldProps: WalletEditDetailsFieldProps = {
		isPending,
		isSuccess,
		isError,
		handleUpdate: (value: string) => setIsSuccess(!!value),
	};

	return (
		<>
			<Details
				details={details}
				detailsFields={WalletEditConfig.getDetailsFields(detailsFieldProps)}
				isLoading={isLoading}
			/>
			<StatusPopup isSuccess={isSuccess} isError={isError} statusTextKey='updateWallet' />
		</>
	);
}
