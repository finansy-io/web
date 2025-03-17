import {useInfiniteQuery} from '@tanstack/react-query';
import {type Props} from './wallet.types.ts';
import {WalletApi} from './wallet.api.ts';

export class WalletModel {
	static useItems(props: Props['useItems'] = {}) {
		const {filter} = props;

		const {
			// data,
			isLoading,
			fetchNextPage,
			hasNextPage,
		} = useInfiniteQuery({
			queryKey: ['wallet-items', filter],

			queryFn: ({pageParam}: {pageParam?: number}) => {
				return WalletApi.fetchItems({
					params: {portfolioId: 1},
					payload: {...filter, pageNumber: pageParam, pageSize: 10},
				});
			},

			initialPageParam: 0,

			getNextPageParam: (lastPage) => {
				return lastPage?.info.hasNext ? lastPage.info.pageNumber + 1 : undefined;
			},
		});

		// const filteredPages = data?.pages.filter((page) => page !== null);

		return {
			// wallets : filteredPages?.length ? filteredPages.flatMap((page) => page && page.items) : null,
			wallets: [
				{name: 'Phantom мемасы', description: '0x812731...12L1bb2sk'},
				{name: 'Metamask долгосрок ETH', description: '0x8193921...2348H6lsk'},
				{name: 'Краткосрок флиппинг', description: '0x7613921...2Lq8H6lsk'},
			],
			isWalletsLoading: isLoading,
			hasNextWalletsPage: hasNextPage,
			fetchNextWalletsPage: fetchNextPage,
		};
	}
}
