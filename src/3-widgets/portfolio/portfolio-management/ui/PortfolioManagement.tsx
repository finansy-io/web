import {useState} from 'react';
import {GoalModel} from '@entities/goal';
import {buttonConfigs, assetSortingOptions} from '../config/PortfolioManagement.config.tsx';
import {getSelectTitle, Item, Management, Profit, SelectField, CardSelectTitle} from '@shared/ui';
import {TextHelpers} from '@shared/lib';
import {APP_TEXT, CURRENCY_SYMBOL, PERIOD_OPTIONS} from '@shared/constants';

export function PortfolioManagement() {
	const {goalTotalBalance, isGoalTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems();

	//move to user preferences
	const [period, setPeriod] = useState(PERIOD_OPTIONS[0].value);
	const [assetSorting, setAssetSorting] = useState<number>(assetSortingOptions[0].descValue);

	const isLoading = isGoalTotalBalanceLoading || isGoalsLoading;

	return (
		<Management
			isLoading={isLoading}
			totalBalance={goalTotalBalance}
			totalBalanceDescription={<Profit />}
			rightNode={
				<SelectField
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
				<CardSelectTitle
					value={assetSorting}
					onChange={setAssetSorting}
					options={assetSortingOptions}
					popupTitle={APP_TEXT.sortBy}
					isRightTitle
				>
					{`${APP_TEXT.by} ${String(getSelectTitle(assetSorting, assetSortingOptions)).toLowerCase()}`}
				</CardSelectTitle>
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
