import {useEffect, useState} from 'react';
import {TextFieldEditButtonProps} from '../types/TextFieldEditButton.types.ts';
import {FieldButton, FieldPopup} from '../../ui-parent';
import {TextField, usePopupState} from '@shared/ui';
import {checkIfTextChanged, useResponsive} from '@shared/lib';

export function TextFieldButton(props: TextFieldEditButtonProps) {
	const {children, entityName, maxLength, initialValue, handleUpdate, isLoading, isPending, isSuccess, isError} = props;

	const [value, setValue] = useState(initialValue);
	const [isFocused, setIsFocused] = useState(false);

	const {popupProps, openPopup, closePopup} = usePopupState();

	const {isTouchable} = useResponsive();

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
				{...{
					popupProps,
					entityName,
					initialValue,
					value,
					setValue,
					handleUpdate,
					isChanged,
					isPending,
					isEdit,
					isKeyboardActive: isFocused && isTouchable,
				}}
			>
				<TextField
					value={value}
					onChange={setValue}
					placeholder={entityName}
					maxLength={maxLength}
					isFocused={isFocused}
					setIsFocused={setIsFocused}
					enterKeyHint='done'
				/>
			</FieldPopup>
		</>
	);
}
