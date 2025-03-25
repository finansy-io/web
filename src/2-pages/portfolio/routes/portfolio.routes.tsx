import {lazy} from 'react';
import {AppLayout, PageFullScreenWrapper} from '@pages/ui';
import {PrivateRoute} from '@shared/lib';
import {APP_PATH} from '@shared/constants';
import {PortfolioManagementPage} from '../ui/PortfolioManagementPage.tsx';

const PortfolioCreatePage = lazy(() => import('../ui/PortfolioCreatePage.tsx'));

const portfolioManagementRoute = {
	path: APP_PATH.portfolio.list,
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

export const portfolioRoutes = [
	{element: <AppLayout />, children: [portfolioManagementRoute]},
	{
		element: <PageFullScreenWrapper />,
		children: [portfolioCreateRoute, portfolioEditRoute],
	},
];
