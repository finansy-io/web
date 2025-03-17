import {APP_PATH} from '@shared/constants';
import {PageFullScreenWrapper} from '@pages/ui';
import {PrivateRoute} from '@shared/lib';
import {WalletConnectPage} from '../ui/WalletConnectPage.tsx';
import {WalletListPage} from '../ui/WalletListPage.tsx';
import {WalletDetailsPage} from '../ui/WalletDetailsPage.tsx';
import {WalletEditPage} from '../ui/WalletEditPage.tsx';

const portfolioInfoRoute = {
	path: APP_PATH.portfolio.connectWallet,
	element: <PrivateRoute page={<WalletConnectPage />} />,
};

const portfolioConnectedWalletsRoute = {
	path: APP_PATH.portfolio.wallets,
	element: <PrivateRoute page={<WalletListPage />} />,
};

const portfolioWalletDetailsRoute = {
	path: `${APP_PATH.portfolio.wallets}/:id`,
	element: <PrivateRoute page={<WalletDetailsPage />} />,
};

const portfolioWalletEditRoute = {
	path: `${APP_PATH.portfolio.wallets}/:id/edit`,
	element: <PrivateRoute page={<WalletEditPage />} />,
};

export const walletRoutes = [
	{
		element: <PageFullScreenWrapper />,
		children: [
			portfolioInfoRoute,
			portfolioConnectedWalletsRoute,
			portfolioWalletDetailsRoute,
			portfolioWalletEditRoute,
		],
	},
];
