import {ManagementProps} from '@shared/ui/management/types/Management.types.ts';
import {Button, Card, LoadingWrapper, TotalBalance} from '@shared/ui';
import {cn} from '@shared/lib';

export function Management(props: ManagementProps) {
	const {isLoading, totalBalance, totalBalanceDescription, rightNode, buttonConfigs, children} = props;

	return (
		<Card>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-4 p-4 pb-0'>
					<div className='flex flex-col gap-1.5'>
						<div className='flex items-center justify-between'>
							<LoadingWrapper isLoading={isLoading} isText3xl>
								<TotalBalance totalBalance={totalBalance} />
							</LoadingWrapper>

							{rightNode && (
								<LoadingWrapper isLoading={isLoading} isTextSm>
									{rightNode}
								</LoadingWrapper>
							)}
						</div>
						<div className='text-sm font-light text-primary-grey'>
							<LoadingWrapper isLoading={isLoading} isTextSm className='w-16'>
								{totalBalanceDescription}
							</LoadingWrapper>
						</div>
					</div>

					<div className={cn('flex', buttonConfigs[0].type === 'circle' ? 'justify-between' : 'gap-2')}>
						{buttonConfigs.map(({name, ...restButtonConfig}, index) => (
							<Button key={index} isLoading={isLoading} {...restButtonConfig}>
								{name}
							</Button>
						))}
					</div>
				</div>

				{children}
			</div>
		</Card>
	);
}
