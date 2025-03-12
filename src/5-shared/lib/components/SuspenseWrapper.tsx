import {ReactNode, Suspense} from 'react';
import {Spinner} from '@shared/ui';
import {cn} from '@shared/lib';

export function SuspenseWrapper({
	children,
	withHeightScreen = false,
}: {
	children: ReactNode;
	withHeightScreen?: boolean;
}) {
	return (
		<Suspense
			fallback={
				<div className={cn('flex  h-screen w-full items-center justify-center p-4', withHeightScreen && 'h-screen')}>
					<Spinner className='size-8 text-primary-grey' />
				</div>
			}
		>
			{children}
		</Suspense>
	);
}
