import {useEffect} from 'react';
import {DeleteItemProps} from '../types/DeleteItem.types.ts';
import {ConfirmationPopup, Item, StatusPopup, usePopupState} from '@shared/ui';
import {cn} from '@shared/lib';

export function DeleteItem(props: DeleteItemProps) {
	const {
		confirmationTitle,
		confirmationDescription,
		isPending,
		actionButtonText,
		handleDelete,
		isSuccess,
		isError,
		children,
		statusTextKey,
	} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	useEffect(() => {
		if (isSuccess || isError) {
			closePopup();
		}
	}, [isSuccess, isError]);

	return (
		<>
			<Item name={children} className={cn('text-sm text-red-500')} onClick={openPopup} isSingle />

			<ConfirmationPopup
				{...popupProps}
				title={confirmationTitle}
				description={confirmationDescription}
				onActionClick={handleDelete}
				isActionPending={isPending}
				actionButtonText={actionButtonText}
			/>

			<StatusPopup isSuccess={isSuccess} isError={isError} statusTextKey={statusTextKey} />
		</>
	);
}
