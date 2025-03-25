import {createBrowserRouter, Navigate, RouterProvider as ReactRouterProvider} from 'react-router-dom';
import {APP_PATH} from '@shared/constants';
import {pageNotFoundRoute} from '@pages/not-found';
import {goalRoutes} from '@pages/goal';
import {authRoutes} from '@pages/auth';
import {portfolioRoutes} from '@pages/portfolio';
import {walletRoutes} from '@pages/wallet';

const router = createBrowserRouter([
	{
		children: [pageNotFoundRoute, ...authRoutes, ...goalRoutes, ...portfolioRoutes, ...walletRoutes],
	},

	{path: APP_PATH.root, element: <Navigate to={APP_PATH.login} replace />},
	{path: '*', element: <Navigate to={APP_PATH.pageNotFound} replace />},
]);

export function RouterProvider() {
	return <ReactRouterProvider router={router} />;
}
