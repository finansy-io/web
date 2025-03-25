import {APP_TEXT} from '@shared/constants';
import {TextHelpers} from '@shared/lib';
import {Icon, type DetailsField} from '@shared/ui';

export class WalletDetailsConfig {
	static getDetailsFields(isCopied: boolean, copy: (value: string) => void) {
		return [
			{
				label: APP_TEXT.address,
				key: 'address',
				type: 'custom',
				customNode: (value: any) => (
					<div className='flex cursor-pointer items-center gap-1.5' onClick={() => copy(value)}>
						<div>{TextHelpers.getShortenWalletAddress(value)}</div>
						<Icon type={isCopied ? 'check' : 'copy'} />
					</div>
				),
			},
		] as DetailsField[];
	}
}
