import {useState} from 'react';
import {walletNameMaxLength} from '@widgets/portfolio';
import {Details, type DetailsField, StatusPopup, TextFieldEditButton} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {TextHelpers} from '@shared/lib';

export function PortfolioWalletEdit() {
	const details = {
		name: 'Metamask memes',
		address: '0x6C7eA518F0eb7066e56CFe667D87c0cD900E034B',
	};

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const isLoading = false;
	const isError = false;

	const detailsFields = [
		{
			label: APP_TEXT.name,
			key: 'name',
			type: 'custom',
			customNode: () => (
				<TextFieldEditButton
					entityName={APP_TEXT.name}
					maxLength={walletNameMaxLength}
					initialValue={details.name}
					handleUpdate={() => setIsSuccess(true)}
					isPending={false}
					isSuccess={isSuccess}
					isError={false}
				>
					{details.name}
				</TextFieldEditButton>
			),
		},
		{
			label: APP_TEXT.address,
			key: 'address',
			type: 'custom',
			customNode: () => (
				<TextFieldEditButton
					entityName={APP_TEXT.address}
					initialValue={details.address}
					handleUpdate={() => setIsSuccess(true)}
					isPending={false}
					isSuccess={false}
					isError={isSuccess}
				>
					{TextHelpers.getShortenWalletAddress(details.address)}
				</TextFieldEditButton>
			),
		},
	] as DetailsField[];

	return (
		<>
			<Details details={details} detailsFields={detailsFields} isLoading={isLoading} />

			<StatusPopup isOpen={isSuccess} status='success' statusTextKey='updateWalletSuccess' />
			<StatusPopup isOpen={isError} status='error' statusTextKey='updateWalletError' />
		</>
	);
}
