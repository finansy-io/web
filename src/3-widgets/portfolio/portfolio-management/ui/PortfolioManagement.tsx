import {useState} from 'react';
import {GoalModel} from '@entities/goal';
import {buttonConfigs, assetSortingOptions} from '../config/PortfolioManagement.config.tsx';
import {Item, Management, Profit, TextSelectField} from '@shared/ui';
import {TextHelpers} from '@shared/lib';
import {APP_TEXT, CURRENCY_SYMBOL, PERIOD_OPTIONS} from '@shared/constants';

export function PortfolioManagement() {
	const {goalTotalBalance, isGoalTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems();

	const [period, setPeriod] = useState(PERIOD_OPTIONS[0].value);
	const [assetSorting, setAssetSorting] = useState(PERIOD_OPTIONS[0].value);

	const isLoading = isGoalTotalBalanceLoading || isGoalsLoading;

	return (
		<Management
			isLoading={isLoading}
			totalBalance={goalTotalBalance}
			totalBalanceDescription={<Profit />}
			rightNode={
				<TextSelectField
					value={period}
					onChange={setPeriod}
					options={PERIOD_OPTIONS}
					popupTitle={APP_TEXT.period}
					isLoading={isLoading}
					withBackground
				/>
			}
			buttonConfigs={buttonConfigs}
			listTitle={APP_TEXT.assets}
			listRightTitle={
				<TextSelectField
					value={assetSorting}
					onChange={setAssetSorting}
					options={assetSortingOptions}
					popupTitle={APP_TEXT.sortBy}
					isLoading={isLoading}
					isCardRightTitle
				/>
			}
			listItems={goals}
			renderListItem={(goal) => (
				<Item
					image={<div className='size-10 rounded-full bg-green-200' />}
					imageIcon={<div className='size-2 bg-secondary-violet' />}
					name={goal.name}
					description='0.1354 $'
					rightName={`${TextHelpers.getAmount(goal.balance.amount)} ${CURRENCY_SYMBOL[goal.balance.currency]}`}
					rightDescription={<Profit />}
				/>
			)}
			fetchNextListPage={fetchNextGoalsPage}
			hasNextListPage={hasNextGoalsPage}
			emptyListTextKey='assets'
		/>
	);
}
