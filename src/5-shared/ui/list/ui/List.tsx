import {Fragment} from 'react';
import {getEmptyText} from '@shared/ui/list/helpers/List.helpers.ts';
import {ListProps} from '../types/List.types.ts';
import {Item, LoadingItem} from '@shared/ui';
import {InfiniteScroll} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';

export function List<R>(props: ListProps<R>) {
	const {
		items,
		renderItem,
		isLoading,
		emptyTextKey,
		fetchNextPage,
		hasNextPage,
		loadingItemWithRightName = true,
	} = props;

	if (isLoading) {
		return <LoadingItem withRightName={loadingItemWithRightName} />;
	}

	return (
		<div className='rounded-2xl bg-white'>
			<InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
				{items?.length ? (
					items.map((row, index) => <Fragment key={index}>{renderItem(row, index)}</Fragment>)
				) : (
					<Item
						name={emptyTextKey ? getEmptyText(emptyTextKey) : APP_TEXT.noData}
						isNameText
						className='text-primary-grey'
					/>
				)}
			</InfiniteScroll>
		</div>
	);
}
