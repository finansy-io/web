import {walletNameMaxLength} from '@widgets/portfolio';
import {APP_TEXT} from '@shared/constants';
import {type DetailsField, TextFieldEditButton} from '@shared/ui';
import {TextHelpers} from '@shared/lib';

export type DetailsFieldProps = {
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
	handleUpdate: (value: string) => void;
};

export function getDetailsFields(detailsFieldProps: DetailsFieldProps) {
	return [
		{
			label: APP_TEXT.name,
			key: 'name',
			type: 'custom',
			customNode: (value: string) => (
				<TextFieldEditButton
					entityName={APP_TEXT.name}
					maxLength={walletNameMaxLength}
					initialValue={value}
					{...detailsFieldProps}
				>
					{value}
				</TextFieldEditButton>
			),
		},
		{
			label: APP_TEXT.address,
			key: 'address',
			type: 'custom',
			customNode: (value: string) => (
				<TextFieldEditButton entityName={APP_TEXT.address} initialValue={value} {...detailsFieldProps}>
					{TextHelpers.getShortenWalletAddress(value)}
				</TextFieldEditButton>
			),
		},
	] as DetailsField[];
}
