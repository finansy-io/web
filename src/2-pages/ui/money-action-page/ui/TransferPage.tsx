import {useEffect, useState} from 'react';
import {MoneyActionPageHelpers} from '../lib/MoneyActionPage.helpers.ts';
import {TransferPageProps} from '../types/MoneyActionPage.types.ts';
import {PageActionButtonWrapper, PageWidgetsWrapper} from '@pages/ui';
import {
	AmountField,
	AmountFieldDetails,
	AmountFieldOption,
	Button,
	DateFieldButton,
	Header,
	Icon,
	StatusPopup,
} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {cn, DateService, isEqual} from '@shared/lib';

export function TransferPage(props: TransferPageProps) {
	const {
		itemDetails,
		items,
		hasNextOptions,
		fetchNextOptions,
		isItemDataLoading,
		transfer,
		isTransferPending,
		isTransferSuccess,
		isTransferError,
		statusTextKey,
		backPath,
		onStatusPopupDismiss,
	} = props;

	const [fromActiveOption, setFromActiveOption] = useState<AmountFieldOption | null>(null);
	const [toActiveOption, setToActiveOption] = useState<AmountFieldOption | null>(null);
	const [options, setOptions] = useState<AmountFieldOption[] | undefined>([]);

	const [fromGoalAmount, setFromGoalAmount] = useState('');
	const [toGoalAmount, setToGoalAmount] = useState('');
	const [shouldChangeToGoalAmount, setShouldChangeToGoalAmount] = useState(true);

	const [date, setDate] = useState<Date>(new Date());

	useEffect(() => {
		if (items && itemDetails) {
			setFromActiveOption(MoneyActionPageHelpers.mapItemDataToOption(itemDetails));

			const options = items
				.filter((item) => item.id !== itemDetails.id)
				.map(MoneyActionPageHelpers.mapItemDataToOption);

			setOptions(options);
			setToActiveOption(options[0]);
		}

		if (items && !itemDetails) {
			setOptions(items.map(MoneyActionPageHelpers.mapItemDataToOption));
			setFromActiveOption(MoneyActionPageHelpers.mapItemDataToOption(items[0]));
			setToActiveOption(MoneyActionPageHelpers.mapItemDataToOption(items[1]));
		}
	}, [itemDetails, items]);

	function handleTransferClick() {
		if (!fromActiveOption || !toActiveOption || !fromGoalAmount || !toGoalAmount) return;

		transfer({
			payload: {
				fromItemId: fromActiveOption.id!,
				toItemId: toActiveOption.id!,
				fromItemAmount: Number(fromGoalAmount),
				toItemAmount: Number(toGoalAmount),
				date: new DateService(date).getPayloadDateFormat(),
			},
		});
	}

	const isFromAmountError =
		!!fromGoalAmount && !!fromActiveOption && Number(fromGoalAmount) > Number(fromActiveOption.amount);

	return (
		<>
			<Header title={APP_TEXT.transfer} backPath={backPath} />

			<PageWidgetsWrapper>
				<div className='relative flex flex-col gap-2'>
					<AmountField
						value={fromGoalAmount}
						onChange={(value) => {
							setFromGoalAmount(value);
							if (shouldChangeToGoalAmount) {
								setToGoalAmount(value);
							}
						}}
						activeOption={fromActiveOption}
						setActiveOption={(activeOption) => {
							setFromActiveOption(activeOption);
							if (isEqual(activeOption.id, toActiveOption?.id)) {
								setToActiveOption(fromActiveOption);
							}
						}}
						options={itemDetails ? undefined : options}
						hasNextOptions={hasNextOptions}
						fetchNextOptions={fetchNextOptions}
						errorText={isFromAmountError && 'exceeds balance'}
						isLoading={isItemDataLoading}
						withMinus
					/>

					<div
						className={cn(
							'absolute left-[50%] top-[50%] flex size-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white transition-all duration-300',
						)}
					>
						<Icon type='transferTo' className='size-4 text-primary-violet' />
					</div>

					<AmountField
						value={toGoalAmount}
						onChange={(value) => {
							value ? setShouldChangeToGoalAmount(false) : setShouldChangeToGoalAmount(true);
							setToGoalAmount(value);
						}}
						activeOption={toActiveOption}
						setActiveOption={(activeOption) => {
							if (isEqual(activeOption.id, fromActiveOption?.id)) {
								setFromActiveOption(toActiveOption);
							}
							setToActiveOption(activeOption);
						}}
						options={options}
						hasNextOptions={hasNextOptions}
						fetchNextOptions={fetchNextOptions}
						isLoading={isItemDataLoading}
						withPlus
						isAutoFocusDisabled
					/>
				</div>

				<AmountFieldDetails
					label={APP_TEXT.transactionDate}
					field={
						<DateFieldButton
							onChange={(value) => (value ? setDate(value) : undefined)}
							value={date}
							title={APP_TEXT.transactionDate}
							withReset={false}
							isTextButtonOnGrey
						>
							{new DateService(date).getLocalDateString()}
						</DateFieldButton>
					}
				/>
			</PageWidgetsWrapper>

			<PageActionButtonWrapper>
				<Button
					type='primary'
					onClick={handleTransferClick}
					disabled={!fromGoalAmount || !toGoalAmount || isFromAmountError}
					isPending={isTransferPending}
				>
					{APP_TEXT.transfer}
				</Button>
			</PageActionButtonWrapper>

			<StatusPopup
				isSuccess={isTransferSuccess}
				isError={isTransferError}
				statusTextKey={statusTextKey}
				onDismiss={onStatusPopupDismiss}
			/>
		</>
	);
}
