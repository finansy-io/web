import {useNavigate} from 'react-router-dom';
import {Icon, Item, List, TextField} from '@shared/ui';
import {useDebouncedSearch} from '@shared/lib';
import {APP_PATH, APP_TEXT} from '@shared/constants';

const wallets = [
	{name: 'Phantom мемасы', description: '0x812731...12L1bb2sk'},
	{name: 'Metamask долгосрок ETH', description: '0x8193921...2348H6lsk'},
	{name: 'Краткосрок флиппинг', description: '0x7613921...2Lq8H6lsk'},
];

export function PortfolioWalletList() {
	const navigate = useNavigate();

	const {debouncedSearch, onDebouncedSearchChange} = useDebouncedSearch({callbackFn: () => alert('request')});

	const isLoading = false;

	return (
		<>
			<TextField value={debouncedSearch} onChange={onDebouncedSearchChange} placeholder={APP_TEXT.search} isSearch />
			<List
				isLoading={isLoading}
				items={wallets}
				renderItem={(wallet) => (
					<Item
						{...wallet}
						image={<Icon type='wallet' withBackground />}
						onClick={() => navigate(APP_PATH.portfolio.getItemWalletDetailsPath('1'))}
					/>
				)}
			/>
		</>
	);
}
