import {APP_PATH, APP_TEXT} from '@shared/constants';
import {Card, Icon, Item, CardLinkTitle, List} from '@shared/ui';
import {GoalModel} from '@entities/goal';

const wallets = [
	{name: 'Phantom мемасы', description: '0x812731...12L1bb2sk'},
	{name: 'Metamask долгосрок ETH', description: '0x8193921...2348H6lsk'},
	{name: 'Краткосрок флиппинг', description: '0x7613921...2Lq8H6lsk'},
];

export function Wallets() {
	const {isGoalsLoading} = GoalModel.useItems();

	const isLoading = isGoalsLoading;

	return (
		<Card
			titleInCard={
				!isLoading && !wallets?.length ? null : (
					<CardLinkTitle title={APP_TEXT.connectedWallets} path={APP_PATH.wallet.wallets} />
				)
			}
			isLoading={isLoading}
		>
			<List
				emptyTextKey='wallets'
				isLoading={isLoading}
				items={wallets ? [wallets[0], wallets[1], wallets[2]] : []}
				renderItem={(wallet, index) => (
					<Item
						key={index}
						image={<Icon type='wallet' withBackground />}
						name={wallet.name}
						description={wallet.description}
						onClick={({navigate}) => {
							navigate(APP_PATH.wallet.getItemDetailsPath('1'), {state: {from: APP_PATH.portfolio.list}});
						}}
					/>
				)}
				loadingItemWithRightName={false}
			/>
		</Card>
	);
}
