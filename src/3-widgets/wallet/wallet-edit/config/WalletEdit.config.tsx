import {type WalletEditDetailsFieldProps} from '../types/WalletEdit.types.ts';
import {APP_TEXT, FORM} from '@shared/constants';
import {type DetailsField, TextFieldEditButton} from '@shared/ui';
import {TextHelpers} from '@shared/lib';

export class WalletEditConfig {
	static getDetailsFields(detailsFieldProps: WalletEditDetailsFieldProps) {
		return [
			{
				label: APP_TEXT.name,
				key: 'name',
				type: 'custom',
				customNode: (value: string) => (
					<TextFieldEditButton
						entityName={APP_TEXT.name}
						maxLength={FORM.nameMaxLength}
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
}
