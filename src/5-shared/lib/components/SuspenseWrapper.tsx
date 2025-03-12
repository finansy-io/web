import {ReactNode, Suspense} from 'react';
import {Spinner} from '@shared/ui';
import {cn} from '@shared/lib';

export function SuspenseWrapper({children}: {children: ReactNode}) {
	return (
		<Suspense
			fallback={
				<div className={cn('flex  h-screen w-full items-center justify-center p-4')}>
					<Spinner className='size-8 text-primary-grey' />
				</div>
			}
		>
			{children}
		</Suspense>
	);
}
