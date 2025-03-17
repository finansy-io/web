import {PreloadSkeleton} from './PreloadSkeleton.tsx';
import {type LoadingWrapperProps} from '../types/LoadingWrapper.types.ts';

export function LoadingWrapper(props: LoadingWrapperProps) {
	const {isLoading, className, loadingChildren, children, isCircular} = props;

	if (isLoading) {
		return (
			<div>
				<PreloadSkeleton isCircular={isCircular} className={className} />
				{loadingChildren}
			</div>
		);
	}

	return children;
}
