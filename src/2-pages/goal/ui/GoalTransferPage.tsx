import {TransferPage} from '@pages/ui';
import {GoalModel} from '@entities/goal';
import {APP_PATH} from '@shared/constants';

export default function GoalTransferPage() {
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems();

	const {transferGoal, isTransferGoalPending, isTransferGoalSuccess, isTransferGoalError} = GoalModel.useTransfer({
		isFromListPage: true,
	});

	return (
		<TransferPage
			items={goals}
			isItemDataLoading={isGoalsLoading}
			fetchNextOptions={fetchNextGoalsPage}
			hasNextOptions={hasNextGoalsPage}
			transfer={(transferProps) => {
				transferGoal({
					payload: {
						fromGoalId: transferProps.payload.fromItemId,
						fromGoalAmount: transferProps.payload.fromItemAmount,
						toGoalId: transferProps.payload.toItemId,
						toGoalAmount: transferProps.payload.toItemAmount,
						date: transferProps.payload.date,
					},
				});
			}}
			isTransferPending={isTransferGoalPending}
			isTransferSuccess={isTransferGoalSuccess}
			isTransferError={isTransferGoalError}
			statusTextKey='transferGoal'
			backPath={APP_PATH.goal.list}
		/>
	);
}
