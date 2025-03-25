import {WalletDetailsConfig} from '../config/WalletDetails.config.tsx';
import {Details} from '@shared/ui';
import {useCopy} from '@shared/lib';

export function WalletDetails() {
	const {isCopied, copy} = useCopy();

	const details = {
		address: '0x6C7eA518F0eb7066e56CFe667D87c0cD900E034B',
	};

	const isLoading = false;

	return (
		<Details
			details={details}
			detailsFields={WalletDetailsConfig.getDetailsFields(isCopied, copy)}
			isLoading={isLoading}
		/>
	);
}
