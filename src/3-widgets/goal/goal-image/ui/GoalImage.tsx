import {useParams} from 'react-router-dom';
import {getButtonConfigs} from '../config/GoalImage.config.tsx';
import {GoalModel} from '@entities/goal';
import {Button, Header, LoadingWrapper, TotalBalance} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function GoalImage() {
	const {id} = useParams();
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	const {goals: allGoals, isGoalsLoading: isAllGoalsLoading} = GoalModel.useItems({queryKey: 'all'});

	const isLoading = isAllGoalsLoading || isGoalDetailsLoading;

	return (
		<div className='flex h-[310px] flex-col bg-secondary-grey'>
			<Header backPath={APP_PATH.goal.list} className='flex-grow' />

			<div className='flex flex-col gap-2 px-4 py-2'>
				<LoadingWrapper isLoading={isLoading} className='mb-5 h-6 w-14'>
					{goalDetails && (
						<>
							<div className='text text-sm'>{goalDetails.name}</div>
							<TotalBalance totalBalance={goalDetails.balance} />
						</>
					)}
				</LoadingWrapper>
			</div>

			<div className='flex justify-between p-2'>
				{getButtonConfigs(id).map(({name, ...restButtonConfig}, index) => (
					<Button
						key={index}
						isLoading={isLoading}
						disabled={name === APP_TEXT.transfer && (allGoals?.length ? allGoals.length <= 1 : true)}
						{...restButtonConfig}
					>
						{name}
					</Button>
				))}
			</div>
		</div>
	);
}
