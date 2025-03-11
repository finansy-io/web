import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {WalletModel} from '@entities/wallet';
import {Icon, Item, List, TextField} from '@shared/ui';
import {useDebounce} from '@shared/lib';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function PortfolioWalletList() {
	const navigate = useNavigate();

	const [search, setSearch] = useState('');
	const [debouncedSearch] = useDebounce(search);

	const {wallets, isWalletsLoading, hasNextWalletsPage, fetchNextWalletsPage} = WalletModel.useItems({
		filter: {search: debouncedSearch},
	});

	return (
		<>
			<TextField value={search} onChange={setSearch} placeholder={APP_TEXT.search} isSearch />
			<List
				isLoading={isWalletsLoading}
				items={wallets}
				renderItem={(wallet) => (
					<Item
						{...wallet}
						image={<Icon type='wallet' withBackground />}
						onClick={() => navigate(APP_PATH.portfolio.getItemWalletDetailsPath('1'))}
					/>
				)}
				hasNextPage={hasNextWalletsPage}
				fetchNextPage={fetchNextWalletsPage}
				loadingItemWithRightName={false}
			/>
		</>
	);
}
