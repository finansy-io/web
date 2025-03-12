import {ReactNode, Suspense} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthApi} from '@entities/auth';
import {APP_PATH} from '@shared/constants';
import {setupInterceptor} from '@shared/api';
import {Spinner} from '@shared/ui';

/**
 * Abstraction for DRY logic across routes
 * permissions
 * licenses
 * auth
 * */

export function PrivateRoute({page}: {page: ReactNode}) {
	if (!AuthApi.getToken()) {
		return <Navigate to={APP_PATH.login} replace />;
	} else {
		setupInterceptor(AuthApi.getToken()!);
	}

	return (
		<Suspense
			fallback={
				<div className='flex w-full items-center justify-center p-4'>
					<Spinner className='size-8 text-primary-grey' />
				</div>
			}
		>
			{page}
		</Suspense>
	);
}
