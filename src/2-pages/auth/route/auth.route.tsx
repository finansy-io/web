import {lazy} from 'react';
import {LoginPage} from '../ui/LoginPage.tsx';
import {APP_PATH} from '@shared/constants';
import {SuspenseWrapper} from '@shared/lib';

const SignupPage = lazy(() => import('../ui/SignupPage.tsx'));

const loginRoute = {
	path: APP_PATH.login,
	element: <LoginPage />,
};

const signupRoute = {
	path: APP_PATH.signup,
	element: (
		<SuspenseWrapper withHeightScreen>
			<SignupPage />
		</SuspenseWrapper>
	),
};

export const authRoutes = [loginRoute, signupRoute];
