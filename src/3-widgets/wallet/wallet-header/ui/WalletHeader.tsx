import {useLocation} from 'react-router-dom';
import {WalletHeaderConfig} from '../config/WalletHeader.config.tsx';
import {Header, Icon} from '@shared/ui';
import {APP_PATH} from '@shared/constants';
import {cn, TextHelpers, useCopy, useResponsive} from '@shared/lib';

export function WalletHeader() {
	const walletName = 'Phantom memes';
	const address = '0x6C7eA518F0eb7066e56CFe667D87c0cD900E034B';

	const location = useLocation();

	const {isCopied, copy} = useCopy();

	const {isTouchable, isClickable} = useResponsive();

	return (
		<Header
			title={walletName}
			subDescription={
				<div
					className={cn(
						'flex w-fit cursor-pointer items-center gap-1.5 transition duration-200',
						isTouchable && 'active:text-black',
						isClickable && 'hover:text-black',
					)}
					onClick={isCopied ? undefined : () => copy(address)}
				>
					<div>{TextHelpers.getShortenWalletAddress(address)}</div>
					<Icon type={isCopied ? 'check' : 'copy'} />
				</div>
			}
			buttonConfigs={WalletHeaderConfig.getButtonConfig()}
			backPath={location.state?.from === APP_PATH.portfolio.list ? APP_PATH.portfolio.list : APP_PATH.wallet.list}
			image={<Icon type='wallet' withBackground />}
		/>
	);
}
