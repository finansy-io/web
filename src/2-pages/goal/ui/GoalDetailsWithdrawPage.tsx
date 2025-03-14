import {useParams} from 'react-router-dom';
import {FundWithdrawPage} from '@pages/ui';
import {GoalModel} from '@entities/goal';
import {APP_PATH} from '@shared/constants';

export default function GoalDetailsWithdrawPage() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	const {withdrawGoal, isWithdrawGoalPending, isWithdrawGoalSuccess, isWithdrawGoalError} = GoalModel.useWithdraw();

	return (
		<FundWithdrawPage
			itemDetails={goalDetails}
			isItemDataLoading={isGoalDetailsLoading}
			actionType='withdraw'
			action={withdrawGoal}
			isActionPending={isWithdrawGoalPending}
			isActionSuccess={isWithdrawGoalSuccess}
			isActionError={isWithdrawGoalError}
			statusTextKey='withdrawGoal'
			backPath={APP_PATH.goal.getItemDetailsPath(id)}
		/>
	);
}
