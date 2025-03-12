import {lazy} from 'react';
import {APP_PATH} from '@shared/constants';
import {SuspenseWrapper} from '@shared/lib';

const PageNotFound = lazy(() => import('../ui/PageNotFound.tsx'));

export const pageNotFoundRoute = {
	path: APP_PATH.pageNotFound,
	element: (
		<SuspenseWrapper withHeightScreen>
			<PageNotFound />
		</SuspenseWrapper>
	),
};
