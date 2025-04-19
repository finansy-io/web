import {lazy} from 'react';
import {AppLayout, PageFullScreenWrapper} from '@pages/ui';
import {PrivateRoute} from '@shared/lib';
import {APP_PATH} from '@shared/constants';

const PortfolioCreatePage = lazy(() => import('../ui/PortfolioCreatePage.tsx'));
import {PortfolioManagementPage} from '../ui/PortfolioManagementPage.tsx';
import {PortfolioTransactionsPage} from '../ui/PortfolioTransactionsPage.tsx';
import {PortfolioWalletsPage} from '../ui/PortfolioWalletsPage.tsx';
import {PortfolioWalletDetailsPage} from '../ui/PortfolioWalletDetailsPage.tsx';
import {PortfolioWalletConnectPage} from '../ui/PortfolioWalletConnectPage.tsx';
import {PortfolioWalletEditPage} from '../ui/PortfolioWalletEditPage.tsx';

const portfolioManagementRoute = {
	path: APP_PATH.portfolio.assets,
	element: <PrivateRoute page={<PortfolioManagementPage />} />,
};

const portfolioCreateRoute = {
	path: APP_PATH.portfolio.create,
	element: <PrivateRoute page={<PortfolioCreatePage />} />,
};

const portfolioEditRoute = {
	path: `${APP_PATH.portfolio.details}/:id/edit`,
	element: <PrivateRoute page={<PortfolioCreatePage />} />,
};

const portfolioTransactionsRoute = {
	path: APP_PATH.portfolio.transactions,
	element: <PrivateRoute page={<PortfolioTransactionsPage />} />,
};

const portfolioWalletsRoute = {
	path: APP_PATH.portfolio.wallets,
	element: <PrivateRoute page={<PortfolioWalletsPage />} />,
};

const portfolioWalletDetailsRoute = {
	path: `${APP_PATH.portfolio.wallets}/:id`,
	element: <PrivateRoute page={<PortfolioWalletDetailsPage />} />,
};

const portfolioWalletConnectRoute = {
	path: APP_PATH.portfolio.connectWallet,
	element: <PrivateRoute page={<PortfolioWalletConnectPage />} />,
};

const portfolioWalletEditRoute = {
	path: `${APP_PATH.portfolio.wallets}/:id/edit`,
	element: <PrivateRoute page={<PortfolioWalletEditPage />} />,
};

export const portfolioRoutes = [
	{element: <AppLayout />, children: [portfolioManagementRoute, portfolioTransactionsRoute, portfolioWalletsRoute]},
	{
		element: <PageFullScreenWrapper />,
		children: [
			portfolioCreateRoute,
			portfolioEditRoute,
			portfolioWalletDetailsRoute,
			portfolioWalletConnectRoute,
			portfolioWalletEditRoute,
		],
	},
];
