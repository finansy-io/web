import {useEffect, useState} from 'react';
import {TextFieldEditButtonProps} from '../types/TextFieldEditButton.types.ts';
import {FieldButton, FieldPopup} from '../../ui-parent';
import {TextField, usePopupState} from '@shared/ui';
import {checkIfTextChanged} from '@shared/lib';

export function TextFieldButton(props: TextFieldEditButtonProps) {
	const {children, entityName, maxLength, initialValue, handleUpdate, isLoading, isPending, isSuccess, isError} = props;

	const [value, setValue] = useState(initialValue);

	const {popupProps, openPopup, closePopup} = usePopupState();

	useEffect(() => {
		if (isSuccess || isError) {
			closePopup();
		}
	}, [isSuccess, isError]);

	const isChanged = checkIfTextChanged(initialValue, value);
	const isEdit = !!value;

	return (
		<>
			<FieldButton openPopup={openPopup} isLoading={!!isLoading} isEdit={isEdit}>
				{children}
			</FieldButton>

			<FieldPopup
				{...{popupProps, entityName, initialValue, value, setValue, handleUpdate, isChanged, isPending, isEdit}}
			>
				<TextField
					value={value}
					onChange={setValue}
					placeholder={entityName}
					maxLength={maxLength}
					enterKeyHint='done'
				/>
			</FieldPopup>
		</>
	);
}
