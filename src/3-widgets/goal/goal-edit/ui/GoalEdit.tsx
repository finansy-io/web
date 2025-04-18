import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {Card, EditButtonField, LoadingWrapper, StatusPopup, TextFieldButton} from '@shared/ui';
import {APP_TEXT, FORM, CURRENCY, CURRENCY_CODE, CURRENCY_OPTIONS, CURRENCY_SYMBOL} from '@shared/constants';
import {DateService, isNull, TextHelpers} from '@shared/lib';

export function GoalEdit() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {updateGoal, isUpdateGoalPending, isUpdateGoalSuccess, isUpdateGoalError} = GoalModel.useUpdateItem();

	const [name, setName] = useState('');
	const [targetAmount, setTargetAmount] = useState<string>('');
	const [deadline, setDeadline] = useState<Date | null>(null);
	const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.USD);

	const [initialState, setInitialState] = useState<any>({});

	useEffect(() => {
		if (!goalDetails) return;

		const newName = goalDetails.name;
		const newTargetAmount = String(goalDetails.targetAmount);
		const newDeadline = goalDetails.deadline ? new DateService(goalDetails.deadline).value : null;
		const newCurrency = goalDetails.balance.currency;

		if (newName !== name || newTargetAmount !== targetAmount || newDeadline !== deadline || newCurrency !== currency) {
			const newState = {
				name: newName,
				targetAmount: newTargetAmount,
				deadline: newDeadline,
				currency: newCurrency,
			};

			setInitialState(newState);
			setName(newState.name);
			setTargetAmount(newState.targetAmount);
			setDeadline(newState.deadline);
			setCurrency(newState.currency);
		}
	}, [goalDetails]);

	function handleUpdate() {
		if (!id) return;

		updateGoal({
			params: {
				id,
			},
			payload: {
				name,
				targetAmount: Number(targetAmount),
				deadline: deadline ? new DateService(deadline).getPayloadDateFormat() : undefined,
				currency,
			},
		});
	}

	function handleNameUpdate(newName: string) {
		if (!id) return;

		updateGoal({
			params: {
				id,
			},
			payload: {
				name: newName,
				targetAmount: Number(targetAmount),
				deadline: deadline ? new DateService(deadline).getPayloadDateFormat() : undefined,
				currency,
			},
		});
	}

	const editButtonCommonProps = {
		isPending: isUpdateGoalPending,
		isSuccess: isUpdateGoalSuccess,
		isError: isUpdateGoalError,
		handleUpdate,
	};

	const isDeadlineChanged = (() => {
		if (isNull(goalDetails?.deadline) && isNull(deadline)) {
			return false;
		}

		if (isNull(goalDetails?.deadline) && !isNull(deadline)) {
			return true;
		}

		if (!isNull(goalDetails?.deadline) && isNull(deadline)) {
			return true;
		}

		if (!!goalDetails?.deadline && !!deadline) {
			return !new DateService(goalDetails?.deadline).isEqualTo(deadline);
		}

		return false;
	})();

	return (
		<>
			<Card>
				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} isTextSm>
						<div className='font-medium text-primary-grey'>{APP_TEXT.name}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} isTextSm>
						<TextFieldButton
							{...editButtonCommonProps}
							entityName={APP_TEXT.name}
							maxLength={FORM.nameMaxLength}
							initialValue={goalDetails?.name}
							handleUpdate={handleNameUpdate}
						>
							{goalDetails?.name}
						</TextFieldButton>
					</LoadingWrapper>
				</div>

				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} isTextSm>
						<div className='font-medium text-primary-grey'>{APP_TEXT.currency}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} isTextSm>
						<EditButtonField<CURRENCY>
							type='select'
							title={APP_TEXT.currency}
							initialValue={initialState.currency}
							value={currency}
							onChange={setCurrency}
							options={CURRENCY_OPTIONS}
							isChanged={goalDetails?.balance.currency !== currency}
							isRequired
							{...editButtonCommonProps}
						>
							{goalDetails && CURRENCY_CODE[goalDetails.balance.currency]}
						</EditButtonField>
					</LoadingWrapper>
				</div>

				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} isTextSm>
						<div className='font-medium text-primary-grey'>{APP_TEXT.targetAmount}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} isTextSm>
						<EditButtonField<string>
							type='amount'
							title={APP_TEXT.targetAmount}
							initialValue={initialState.targetAmount}
							value={targetAmount}
							onChange={(value) => {
								console.log('value', value);
								setTargetAmount(value);
							}}
							isChanged={String(goalDetails?.targetAmount) !== targetAmount}
							activeOption={
								goalDetails && {
									name: CURRENCY_CODE[goalDetails.balance.currency],
									currency: goalDetails.balance.currency,
								}
							}
							icon={!goalDetails?.targetAmount ? 'add' : undefined}
							{...editButtonCommonProps}
						>
							{goalDetails?.targetAmount ? (
								<span>
									{goalDetails?.targetAmount && TextHelpers.getAmount(goalDetails.targetAmount)}{' '}
									{goalDetails && CURRENCY_SYMBOL[goalDetails.balance.currency]}
								</span>
							) : (
								APP_TEXT.addTargetAmount
							)}
						</EditButtonField>
					</LoadingWrapper>
				</div>

				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} isTextSm>
						<div className='font-medium text-primary-grey'>{APP_TEXT.deadline}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} isTextSm>
						<EditButtonField<Date | null>
							type='date'
							title={APP_TEXT.deadline}
							initialValue={initialState.deadline}
							value={deadline}
							onChange={setDeadline}
							isChanged={isDeadlineChanged}
							icon={!goalDetails?.deadline ? 'add' : undefined}
							minDate={new DateService().getTomorrowDate()}
							{...editButtonCommonProps}
						>
							{goalDetails?.deadline
								? new DateService(goalDetails.deadline).getLocalDateString()
								: APP_TEXT.addDeadline}
						</EditButtonField>
					</LoadingWrapper>
				</div>
			</Card>

			<StatusPopup isSuccess={isUpdateGoalSuccess} isError={isUpdateGoalError} statusTextKey='updateGoal' />
		</>
	);
}
