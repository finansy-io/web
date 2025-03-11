import {useParams} from 'react-router-dom';
import {PageHeader, PageWidgetsWrapper} from '@pages/ui';
import {GoalTransactionsHistory} from '@widgets/goal';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function GoalTransactionsPage() {
	const {id} = useParams();

	return (
		<>
			<PageHeader title={APP_TEXT.transactions} backPath={APP_PATH.goal.getItemDetailsPath(id)} />
			<PageWidgetsWrapper>
				<GoalTransactionsHistory />
			</PageWidgetsWrapper>
		</>
	);
}
