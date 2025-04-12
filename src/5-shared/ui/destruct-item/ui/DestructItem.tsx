import {useEffect} from 'react';
import {type DestructItemProps} from '../types/DestructItem.types.ts';
import {ConfirmationPopup, Item, StatusPopup, usePopupState} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

export function DestructItem(props: DestructItemProps) {
	const {
		confirmationTitle,
		confirmationDescription,
		isPending,
		destructButtonText,
		onDestruct,
		onStatusPopupDismiss,
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
			<Item name={children} className='text-sm text-red-500' onClick={openPopup} isSingle />

			<ConfirmationPopup
				{...popupProps}
				close={closePopup}
				title={confirmationTitle}
				description={confirmationDescription}
				onActionClick={onDestruct}
				isActionPending={isPending}
				actionButtonText={destructButtonText ?? APP_TEXT.delete}
			/>

			<StatusPopup
				isSuccess={isSuccess}
				isError={isError}
				statusTextKey={statusTextKey}
				onDismiss={onStatusPopupDismiss}
			/>
		</>
	);
}
