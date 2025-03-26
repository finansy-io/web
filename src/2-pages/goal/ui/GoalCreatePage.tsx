import {useState} from 'react';
import {PageActionButtonWrapper, PageWidgetsWrapper} from '@pages/ui';
import {GoalImageField} from '@widgets/goal';
import {GoalModel} from '@entities/goal';
import {
	AmountField,
	Button,
	DatePicker,
	Header,
	SelectWithSearchField,
	StatusPopup,
	TextField,
	AmountFieldDetails,
	TextFieldHints,
} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY, CURRENCY_OPTIONS, FORM} from '@shared/constants';
import {cn, DateService} from '@shared/lib';

export default function GoalCreatePage() {
	const [activeStepIndex, setActiveStepIndex] = useState(0);

	const [name, setName] = useState('');
	const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.USD);
	const [targetAmount, setTargetAmount] = useState('');
	const [deadline, setDeadline] = useState<Date | null>(null);

	const {createGoal, isCreateGoalPending, isCreateGoalSuccess, isCreateGoalError} = GoalModel.useCreateItem();

	function handleCreateClick() {
		createGoal({
			payload: {
				name,
				currency,
				targetAmount: Number(targetAmount),
				deadline: deadline ? new DateService(deadline).getPayloadDateFormat() : undefined,
			},
		});
	}

	const PageHeader = (
		<Header
			title={cn(
				activeStepIndex === 0 && APP_TEXT.customise,
				activeStepIndex === 1 && APP_TEXT.selectCurrency,
				activeStepIndex === 2 && APP_TEXT.enterTargetValue,
			)}
			handleBackButtonClick={activeStepIndex === 0 ? undefined : () => setActiveStepIndex(activeStepIndex - 1)}
			backPath={APP_PATH.goal.list}
			stepsCount={3}
			activeStepIndex={activeStepIndex}
		/>
	);

	return (
		<>
			{activeStepIndex !== 0 && PageHeader}

			{activeStepIndex === 0 && (
				<>
					<GoalImageField isCreatePage>{PageHeader}</GoalImageField>
					<PageWidgetsWrapper withTopSpace>
						<TextField value={name} onChange={setName} maxLength={FORM.nameMaxLength} placeholder={APP_TEXT.goalName} />
						<TextFieldHints
							visible={!name}
							hints={['Mustang', 'House', 'Guitar', 'Maldives', 'TV', 'iPhone', 'Education']}
							setTextFieldValue={setName}
						/>
					</PageWidgetsWrapper>
				</>
			)}

			{activeStepIndex === 1 && (
				<PageWidgetsWrapper>
					<SelectWithSearchField
						options={CURRENCY_OPTIONS}
						onChange={(value) => {
							setCurrency(value);
							setTargetAmount('');
						}}
						value={currency}
					/>
				</PageWidgetsWrapper>
			)}

			{activeStepIndex === 2 && (
				<PageWidgetsWrapper>
					<AmountField
						value={targetAmount}
						onChange={setTargetAmount}
						activeOption={{
							name: CURRENCY_OPTIONS.find((option) => option.value === currency)?.description ?? '',
							currency: currency as CURRENCY,
						}}
					/>
					<AmountFieldDetails
						label={APP_TEXT.deadline}
						field={
							<DatePicker
								onChange={setDeadline}
								value={deadline}
								minDate={new DateService().getTomorrowDate()}
								title={APP_TEXT.deadline}
								isTextButtonOnGrey
							>
								{deadline ? new DateService(deadline).getLocalDateString() : APP_TEXT.addDeadline}
							</DatePicker>
						}
					/>
				</PageWidgetsWrapper>
			)}

			<PageActionButtonWrapper>
				<Button
					type='primary'
					onClick={activeStepIndex === 2 ? handleCreateClick : () => setActiveStepIndex(activeStepIndex + 1)}
					disabled={(activeStepIndex === 0 && !name) || (activeStepIndex === 2 && !targetAmount)}
					isPending={isCreateGoalPending}
				>
					{activeStepIndex === 2 ? APP_TEXT.create : APP_TEXT.continue}
				</Button>
			</PageActionButtonWrapper>

			<StatusPopup
				isSuccess={isCreateGoalSuccess}
				isError={isCreateGoalError}
				statusTextKey='createGoal'
				statusTextProps={{name}}
			/>
		</>
	);
}
