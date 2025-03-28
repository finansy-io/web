import {useEffect, useState} from 'react';
import {type FundWithdrawPageProps} from '../types/MoneyActionPage.types.ts';
import {MoneyActionPageHelpers} from '../lib/MoneyActionPage.helpers.ts';
import {PageActionButtonWrapper, PageWidgetsWrapper} from '@pages/ui';
import {
	AmountField,
	AmountFieldDetails,
	type AmountFieldOption,
	Button,
	DateFieldButton,
	Header,
	StatusPopup,
} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {DateService, TextHelpers} from '@shared/lib';

export function FundWithdrawPage(props: FundWithdrawPageProps) {
	const {
		itemDetails,
		items,
		fetchNextOptions,
		hasNextOptions,
		isItemDataLoading,
		actionType,
		action,
		isActionPending,
		isActionSuccess,
		isActionError,
		statusTextKey,
		backPath,
	} = props;

	const [activeOption, setActiveOption] = useState<AmountFieldOption | null>(null);
	const [options, setOptions] = useState<AmountFieldOption[] | undefined>();

	const [amount, setAmount] = useState('');
	const [date, setDate] = useState<Date>(new DateService().value);

	useEffect(() => {
		if (itemDetails) {
			setActiveOption(MoneyActionPageHelpers.mapItemDataToOption(itemDetails));
		}

		if (items) {
			setOptions(items.map(MoneyActionPageHelpers.mapItemDataToOption));
			setActiveOption(MoneyActionPageHelpers.mapItemDataToOption(items[0]));
		}
	}, [itemDetails, items]);

	function handleActionClick() {
		if (!activeOption?.id) return;

		action({
			params: {id: activeOption.id},
			payload: {amount: Number(amount), date: new DateService(date).getPayloadDateFormat()},
		});
	}

	const showWithdrawValidation =
		actionType === 'withdraw' && !!activeOption && !!amount.length && Number(amount) > Number(activeOption.amount);

	return (
		<>
			<Header title={APP_TEXT[actionType]} backPath={backPath} />

			<PageWidgetsWrapper>
				<AmountField
					value={amount}
					onChange={setAmount}
					activeOption={activeOption}
					options={options}
					fetchNextOptions={fetchNextOptions}
					hasNextOptions={hasNextOptions}
					setActiveOption={setActiveOption}
					isLoading={isItemDataLoading}
					errorText={showWithdrawValidation && 'exceeds balance'}
					withPlus={actionType === 'fund'}
					withMinus={actionType === 'withdraw'}
				/>
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
					onClick={handleActionClick}
					disabled={!amount || showWithdrawValidation}
					isPending={isActionPending}
				>
					{APP_TEXT[actionType]}
				</Button>
			</PageActionButtonWrapper>

			{activeOption && (
				<StatusPopup
					isSuccess={isActionSuccess}
					isError={isActionError}
					statusTextKey={statusTextKey}
					statusTextProps={{
						name: activeOption.name,
						amount: `${TextHelpers.getAmountWithCurrency(amount, activeOption.currency)}`,
					}}
				/>
			)}
		</>
	);
}
