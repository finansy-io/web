import {Card, CardSelectTitle, getSelectTitle, Item, ItemImageWithProgress, List, Management} from '@shared/ui';
import {buttonConfigs, goalsDefaultFilter, goalStatusOptions} from '../config/GoalManagement.config.tsx';
import {GoalModel} from '@entities/goal';
import {TextHelpers, useFilter} from '@shared/lib';
import {APP_PATH, APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';

export function GoalManagement() {
	const {filter, setFilter} = useFilter<typeof goalsDefaultFilter>({defaultFilter: goalsDefaultFilter});

	const {goalTotalBalance, isGoalTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems({filter});
	const {goals: allGoals, isGoalsLoading: isAllGoalsLoading} = GoalModel.useItems({queryKey: 'all'});

	const isLoading = isGoalTotalBalanceLoading || isGoalsLoading || isAllGoalsLoading;

	return (
		<Management
			isLoading={isLoading}
			totalBalance={goalTotalBalance}
			totalBalanceDescription={APP_TEXT.totalBalance}
			buttonConfigs={buttonConfigs.map((buttonConfig) => ({
				...buttonConfig,
				disabled: (() => {
					if (buttonConfig.name === APP_TEXT.transfer) {
						return allGoals?.length ? allGoals.length <= 1 : true;
					}

					if (buttonConfig.name === APP_TEXT.fund || buttonConfig.name === APP_TEXT.withdraw) {
						return !allGoals?.length;
					}
				})(),
			}))}
		>
			<Card
				titleInCard={
					<CardSelectTitle
						value={filter.status}
						onChange={(value) => setFilter({...filter, status: value})}
						options={goalStatusOptions}
						isLoading={isLoading}
						popupTitle={APP_TEXT.goals}
					>
						{`${getSelectTitle(filter.status, goalStatusOptions)} ${APP_TEXT.goals.toLowerCase()}`}
					</CardSelectTitle>
				}
				isManagementCard
			>
				<List
					emptyTextKey='goals'
					isLoading={isLoading}
					items={goals}
					renderItem={(goal) => (
						<Item
							image={
								goal.targetAmount ? (
									<ItemImageWithProgress
										image={<div className='size-10 rounded-full bg-green-200' />}
										current={goal.balance.amount}
										target={goal.targetAmount}
									/>
								) : (
									<div className='size-10 rounded-full bg-green-200' />
								)
							}
							name={goal.name}
							description={
								goal.targetAmount && goal.targetAmount > goal.balance.amount
									? `${APP_TEXT.left}: ${TextHelpers.getAmount(goal.targetAmount - goal.balance.amount)} ${
											CURRENCY_SYMBOL[goal.balance.currency]
									  }`
									: APP_TEXT.goalAchieved
							}
							rightName={`${TextHelpers.getAmount(goal.balance.amount)} ${CURRENCY_SYMBOL[goal.balance.currency]}`}
							onClick={({navigate}) => navigate(APP_PATH.goal.getItemDetailsPath(goal.id))}
						/>
					)}
					hasNextPage={hasNextGoalsPage}
					fetchNextPage={fetchNextGoalsPage}
				/>
			</Card>
		</Management>
	);
}
