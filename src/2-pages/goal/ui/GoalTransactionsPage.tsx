import {useParams} from 'react-router-dom';
import {PageWidgetsWrapper} from '@pages/ui';
import {GoalTransactionsHistory} from '@widgets/goal';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {Header} from '@shared/ui';

export default function GoalTransactionsPage() {
	const {id} = useParams();

	return (
		<>
			<Header title={APP_TEXT.transactions} backPath={APP_PATH.goal.getItemDetailsPath(id)} />
			<PageWidgetsWrapper>
				<GoalTransactionsHistory />
			</PageWidgetsWrapper>
		</>
	);
}
