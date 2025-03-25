import {PreloadSkeleton} from './PreloadSkeleton.tsx';
import {type LoadingWrapperProps} from '../types/LoadingWrapper.types.ts';
import {cn} from '@shared/lib';

export function LoadingWrapper(props: LoadingWrapperProps) {
	const {isLoading, className, loadingChildren, children, isCircular, isTextSm} = props;

	if (isLoading) {
		return (
			<div>
				<PreloadSkeleton isCircular={isCircular} className={cn(isTextSm && 'my-0.5 h-4 w-10', className)} />
				{loadingChildren}
			</div>
		);
	}

	return children;
}
