import {PageHeader, PageWidgetsWrapper} from '@pages/ui';
import {GoalImage, GoalProgress, GoalTransactions} from '@widgets/goal';
import {APP_PATH} from '@shared/constants';

export function GoalDetailsPage() {
	return (
		<>
			<GoalImage pageHeader={<PageHeader backPath={APP_PATH.goal.list} className='flex-grow' />} />
			<PageWidgetsWrapper withTopSpace>
				<GoalProgress />
				<GoalTransactions />
			</PageWidgetsWrapper>
		</>
	);
}
