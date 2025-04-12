import {ManagementProps} from '@shared/ui/management/types/Management.types.ts';
import {Button, Card, List, LoadingWrapper, TotalBalance} from '@shared/ui';
import {cn} from '@shared/lib';

export function Management<ListItem>(props: ManagementProps<ListItem>) {
	const {
		isLoading,
		totalBalance,
		totalBalanceDescription,
		rightNode,
		buttonConfigs,
		listTitle,
		listRightTitle,
		listItems,
		renderListItem,
		hasNextListPage,
		fetchNextListPage,
		emptyListTextKey,
	} = props;

	return (
		<>
			<Card>
				<div className='flex flex-col gap-4 p-4 pb-3'>
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

				<div className='flex justify-between px-4 py-3 text-sm font-medium text-primary-grey'>
					<LoadingWrapper isLoading={isLoading} isTextSm>
						<div>{listTitle}</div>
						{listRightTitle && <div>{listRightTitle}</div>}
					</LoadingWrapper>
				</div>

				<List
					emptyTextKey={emptyListTextKey}
					isLoading={isLoading}
					items={listItems}
					renderItem={renderListItem}
					hasNextPage={hasNextListPage}
					fetchNextPage={fetchNextListPage}
				/>
			</Card>
		</>
	);
}
