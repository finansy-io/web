import {PreloadSkeleton} from '../ui-parent/PreloadSkeleton.tsx';
import {type LoadingWrapperProps} from '../types/LoadingWrapper.types.ts';
import {cn, useResponsive} from '@shared/lib';

export function LoadingWrapper(props: LoadingWrapperProps) {
	const {
		isLoading,
		className,
		loadingChildren,
		children,
		isCircular,
		isTextSm,
		isTextBase,
		isText3xl,
		isFilledButton,
		isIconButton,
	} = props;

	const {isDesktop} = useResponsive();

	if (isLoading) {
		return (
			<div className={isDesktop ? 'cursor-progress' : undefined}>
				<PreloadSkeleton
					isCircular={isCircular}
					className={cn(
						isTextSm && 'my-0.5 h-4 w-10', // 20px
						isTextBase && 'my-1 h-4 w-10', // 24px
						isText3xl && 'my-1 h-7 w-32', // 36px
						isFilledButton && 'my-1.5 h-7 w-24 rounded-3xl', // 40px
						isIconButton && 'm-1 size-7 rounded-full', // 36x36px
						className,
					)}
				/>
				{loadingChildren}
			</div>
		);
	}

	return children;
}
