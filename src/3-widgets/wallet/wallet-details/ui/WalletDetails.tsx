import {WalletDetailsConfig} from '../config/WalletDetails.config.tsx';
import {Details} from '@shared/ui';
import {useCopy, useResponsive} from '@shared/lib';

export function WalletDetails() {
	const copyProps = useCopy();

	const responsiveProps = useResponsive();

	const details = {
		address: '0x6C7eA518F0eb7066e56CFe667D87c0cD900E034B',
	};

	const isLoading = false;

	return (
		<Details
			details={details}
			detailsFields={WalletDetailsConfig.getDetailsFields({...copyProps, ...responsiveProps})}
			isLoading={isLoading}
		/>
	);
}
