import {useParams} from 'react-router-dom';
import {FundWithdrawPage} from '@pages/ui';
import {GoalModel} from '@entities/goal';
import {APP_PATH} from '@shared/constants';

export default function GoalDetailsFundPage() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	const {fundGoal, isFundGoalPending, isFundGoalSuccess, isFundGoalError} = GoalModel.useFund();

	return (
		<FundWithdrawPage
			itemDetails={goalDetails}
			isItemDataLoading={isGoalDetailsLoading}
			actionType='fund'
			action={fundGoal}
			isActionPending={isFundGoalPending}
			isActionSuccess={isFundGoalSuccess}
			isActionError={isFundGoalError}
			statusTextKey='fundGoal'
			backPath={APP_PATH.goal.getItemDetailsPath(id)}
			onStatusPopupDismiss={(navigate) => navigate(APP_PATH.goal.getItemDetailsPath(id))}
		/>
	);
}
