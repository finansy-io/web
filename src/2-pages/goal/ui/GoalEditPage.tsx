import {GoalDelete, GoalEdit, GoalImageField} from '@widgets/goal';
import {PageWidgetsWrapper} from '@pages/ui';
import {Header} from '@shared/ui';
import {APP_PATH} from '@shared/constants';
import {useParams} from 'react-router-dom';

export default function GoalEditPage() {
	const {id} = useParams();

	return (
		<>
			<GoalImageField>
				<Header backPath={APP_PATH.goal.getItemDetailsPath(id)} />
			</GoalImageField>
			<PageWidgetsWrapper withTopSpace>
				<GoalEdit />
				<GoalDelete />
			</PageWidgetsWrapper>
		</>
	);
}
