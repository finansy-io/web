import {CardProps} from '../types/Card.types.ts';
import {cn} from '@shared/lib';
import {LoadingWrapper} from '@shared/ui';

export function Card(props: CardProps) {
	const {title, rightTitle, titleInCard, rightTitleInCard, children, isLoading} = props;

	return (
		<div>
			{(title || rightTitle) && (
				<div className={cn('flex pb-3', title && rightTitle && 'items-center justify-between')}>
					{title && (
						<LoadingWrapper isLoading={!!isLoading} isTextSm>
							<div className='font-semibold'>{title}</div>
						</LoadingWrapper>
					)}
					{rightTitle}
				</div>
			)}

			<div role='card' className='w-full rounded-2xl bg-white'>
				{(titleInCard || rightTitleInCard) && (
					<div className='flex items-center justify-between px-4 py-3 text-sm font-medium text-primary-grey'>
						{titleInCard && (
							<div>
								<LoadingWrapper isLoading={!!isLoading} isTextSm>
									{titleInCard}
								</LoadingWrapper>
							</div>
						)}

						{rightTitleInCard}
					</div>
				)}

				{children}
			</div>
		</div>
	);
}
