import {FundWithdrawPage} from '@pages/ui';
import {GoalModel} from '@entities/goal';
import {APP_PATH} from '@shared/constants';

export default function GoalWithdrawPage() {
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems();

	const {withdrawGoal, isWithdrawGoalPending, isWithdrawGoalSuccess, isWithdrawGoalError} = GoalModel.useWithdraw();

	return (
		<FundWithdrawPage
			actionType='withdraw'
			items={goals}
			fetchNextOptions={fetchNextGoalsPage}
			hasNextOptions={hasNextGoalsPage}
			isItemDataLoading={isGoalsLoading}
			action={withdrawGoal}
			isActionPending={isWithdrawGoalPending}
			isActionSuccess={isWithdrawGoalSuccess}
			isActionError={isWithdrawGoalError}
			statusTextKey='withdrawGoal'
			backPath={APP_PATH.goal.list}
			onStatusPopupDismiss={(navigate) => navigate(APP_PATH.goal.list)}
		/>
	);
}
