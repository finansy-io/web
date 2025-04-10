import {APP_TEXT} from '@shared/constants';
import {cn, TextHelpers} from '@shared/lib';
import {Icon, type DetailsField} from '@shared/ui';
import {hoverPadding, hoverRounded} from '@shared/styles';

export class WalletDetailsConfig {
	static getDetailsFields(props: {
		isCopied: boolean;
		copy: (value: string) => void;
		isMobile: boolean;
		isTablet: boolean;
		isDesktop: boolean;
	}) {
		const {isMobile, isTablet, isDesktop, isCopied, copy} = props;

		return [
			{
				label: APP_TEXT.address,
				key: 'address',
				type: 'custom',
				customNode: (value: any) => (
					<div
						className={cn(
							'flex cursor-pointer items-center gap-1.5 transition duration-200',
							(isMobile || isTablet) && 'active:text-primary-grey',
							isDesktop && cn(hoverPadding, hoverRounded, 'hover:bg-on-white-hover active:bg-on-white-active'),
						)}
						onClick={() => copy(value)}
					>
						<div>{TextHelpers.getShortenWalletAddress(value)}</div>
						<Icon type={isCopied ? 'check' : 'copy'} />
					</div>
				),
			},
		] as DetailsField[];
	}
}
