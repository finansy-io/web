import {useEffect, useState} from 'react';
import {type FundWithdrawPageProps} from '../types/MoneyActionPage.types.ts';
import {MoneyActionPageHelpers} from '../lib/MoneyActionPage.helpers.ts';
import {PageActionButtonWrapper, PageWidgetsWrapper} from '@pages/ui';
import {AmountField, type AmountFieldOption, Button, DatePicker, Header, StatusPopup} from '@shared/ui';
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
		successTextKey,
		errorTextKey,
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
				<div className='flex justify-between px-4 text-sm'>
					<div className='font-medium text-primary-grey'>{APP_TEXT.transactionDate}</div>
					<DatePicker
						onChange={(value) => (value ? setDate(value) : undefined)}
						value={date}
						title={APP_TEXT.transactionDate}
						withReset={false}
					>
						{new DateService(date).getLocalDateString()}
					</DatePicker>
				</div>
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
					isOpen={isActionSuccess}
					status='success'
					statusTextKey={successTextKey}
					statusTextProps={{
						name: activeOption.name,
						amount: `${TextHelpers.getAmountWithCurrency(amount, activeOption.currency)}`,
					}}
				/>
			)}
			{activeOption && (
				<StatusPopup
					isOpen={isActionError}
					status='error'
					statusTextKey={errorTextKey}
					statusTextProps={{name: activeOption.name}}
				/>
			)}
		</>
	);
}
