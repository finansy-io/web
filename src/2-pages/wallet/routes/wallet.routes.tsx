import {APP_PATH} from '@shared/constants';
import {PageFullScreenWrapper} from '@pages/ui';
import {PrivateRoute} from '@shared/lib';
import {WalletConnectPage} from '../ui/WalletConnectPage.tsx';
import {WalletListPage} from '../ui/WalletListPage.tsx';
import {WalletDetailsPage} from '../ui/WalletDetailsPage.tsx';
import {WalletEditPage} from '../ui/WalletEditPage.tsx';

const connectWalletRoute = {
	path: APP_PATH.wallet.connectWallet,
	element: <PrivateRoute page={<WalletConnectPage />} />,
};

const walletsRoute = {
	path: APP_PATH.wallet.list,
	element: <PrivateRoute page={<WalletListPage />} />,
};

const walletDetailsRoute = {
	path: `${APP_PATH.wallet.list}/:id`,
	element: <PrivateRoute page={<WalletDetailsPage />} />,
};

const walletEditRoute = {
	path: `${APP_PATH.wallet.list}/:id/edit`,
	element: <PrivateRoute page={<WalletEditPage />} />,
};

export const walletRoutes = [
	{
		element: <PageFullScreenWrapper />,
		children: [connectWalletRoute, walletsRoute, walletDetailsRoute, walletEditRoute],
	},
];
