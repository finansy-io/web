import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {DestructItem, LoadingWrapper} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

export function GoalDelete() {
	const {id} = useParams();

	const {deleteGoal, isDeleteGoalPending, isDeleteGoalSuccess, isDeleteGoalError} = GoalModel.useDeleteItem();
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	return (
		<DestructItem
			confirmationTitle={goalDetails?.name as string}
			confirmationDescription={`${APP_TEXT.confirmation.deleteGoal} ${APP_TEXT.goal?.toLowerCase()}?`}
			isPending={isDeleteGoalPending}
			isSuccess={isDeleteGoalSuccess}
			isError={isDeleteGoalError}
			onDestruct={() => deleteGoal({params: {id: id!}})}
			statusTextKey='deleteGoal'
		>
			<LoadingWrapper isLoading={isGoalDetailsLoading} isTextSm>
				{APP_TEXT.deleteGoal}
			</LoadingWrapper>
		</DestructItem>
	);
}
