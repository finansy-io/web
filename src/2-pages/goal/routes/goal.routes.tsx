import {lazy} from 'react';
import {PageFullScreenWrapper, AppLayout} from '@pages/ui';
import {APP_PATH} from '@shared/constants';
import {PrivateRoute} from '@shared/lib';

const GoalCreatePage = lazy(() => import('../ui/GoalCreatePage.tsx'));
const GoalDetailsPage = lazy(() => import('../ui/GoalDetailsPage.tsx'));
const GoalListPage = lazy(() => import('../ui/GoalListPage.tsx'));
const GoalTransferPage = lazy(() => import('../ui/GoalTransferPage.tsx'));
const GoalFundPage = lazy(() => import('../ui/GoalFundPage.tsx'));
const GoalWithdrawPage = lazy(() => import('../ui/GoalWithdrawPage.tsx'));
const GoalEditPage = lazy(() => import('../ui/GoalEditPage.tsx'));
const GoalTransactionsPage = lazy(() => import('../ui/GoalTransactionsPage.tsx'));
const GoalDetailsFundPage = lazy(() => import('../ui/GoalDetailsFundPage.tsx'));
const GoalDetailsWithdrawPage = lazy(() => import('../ui/GoalDetailsWithdrawPage.tsx'));
const GoalDetailsTransferPage = lazy(() => import('../ui/GoalDetailsTransferPage.tsx'));

const goalListRoute = {
	path: APP_PATH.goal.list,
	element: <PrivateRoute page={<GoalListPage />} />,
};

const goalCreateRoute = {
	path: APP_PATH.goal.create,
	element: <PrivateRoute page={<GoalCreatePage />} />,
};

const goalTransferRoute = {
	path: APP_PATH.goal.transfer,
	element: <PrivateRoute page={<GoalTransferPage />} />,
};

const goalFundRoute = {
	path: APP_PATH.goal.fund,
	element: <PrivateRoute page={<GoalFundPage />} />,
};

const goalWithdrawRoute = {
	path: APP_PATH.goal.withdraw,
	element: <PrivateRoute page={<GoalWithdrawPage />} />,
};

const goalDetailsRoute = {
	path: `${APP_PATH.goal.details}/:id`,
	element: <PrivateRoute page={<GoalDetailsPage />} />,
};

const goalDetailsFundRoute = {
	path: `${APP_PATH.goal.details}/:id/fund`,
	element: <PrivateRoute page={<GoalDetailsFundPage />} />,
};

const goalDetailsWithdrawRoute = {
	path: `${APP_PATH.goal.details}/:id/withdraw`,
	element: <PrivateRoute page={<GoalDetailsWithdrawPage />} />,
};

const goalEditRoute = {
	path: `${APP_PATH.goal.details}/:id/edit`,
	element: <PrivateRoute page={<GoalEditPage />} />,
};

const goalTransactionsRoute = {
	path: `${APP_PATH.goal.details}/:id/transactions`,
	element: <PrivateRoute page={<GoalTransactionsPage />} />,
};

const goalDetailsTransferRoute = {
	path: `${APP_PATH.goal.details}/:id/transfer`,
	element: <PrivateRoute page={<GoalDetailsTransferPage />} />,
};

export const goalRoutes = [
	{element: <AppLayout />, children: [goalListRoute]},
	{
		element: <PageFullScreenWrapper />,
		children: [
			goalDetailsRoute,
			goalCreateRoute,
			goalTransferRoute,
			goalFundRoute,
			goalWithdrawRoute,
			goalEditRoute,
			goalTransactionsRoute,
			goalDetailsFundRoute,
			goalDetailsWithdrawRoute,
			goalDetailsTransferRoute,
		],
	},
];
