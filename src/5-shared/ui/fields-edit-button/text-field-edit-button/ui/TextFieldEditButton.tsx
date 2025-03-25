import {useEffect, useState} from 'react';
import {TextFieldEditButtonProps} from '../types/TextFieldEditButton.types.ts';
import {Button, Icon, LoadingWrapper, Popup, TextField, usePopupState} from '@shared/ui';
import {checkIfTextChanged} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';

export function TextFieldEditButton(props: TextFieldEditButtonProps) {
	const {children, entityName, maxLength, initialValue, handleUpdate, isLoading, isPending, isSuccess, isError} = props;

	const [value, setValue] = useState(initialValue);
	const [isChanged, setIsChanged] = useState(false);

	const {popupProps, openPopup, closePopup} = usePopupState();

	useEffect(() => {
		setIsChanged(checkIfTextChanged(initialValue, value));
	}, [value, initialValue]);

	useEffect(() => {
		if (isSuccess || isError) {
			closePopup();
		}
	}, [isSuccess, isError]);

	return (
		<>
			<LoadingWrapper isLoading={!!isLoading} isTextSm>
				<Button type='text' onClick={openPopup} icon={<Icon type='edit' className='size-1' />}>
					{children}
				</Button>
			</LoadingWrapper>

			<Popup
				title={APP_TEXT.edit + ' ' + entityName.toLowerCase()}
				isOpen={popupProps.isOpen}
				setIsOpen={(open) => {
					if (!open && isChanged) {
						setValue(initialValue);
					}

					popupProps.setIsOpen(open);
				}}
			>
				<TextField
					value={value}
					onChange={setValue}
					placeholder={entityName}
					maxLength={maxLength}
					enterKeyHint='done'
				/>

				<Button
					className='mt-2'
					type='primary'
					onClick={() => handleUpdate(value)}
					isPending={isPending}
					disabled={!isChanged || !value}
				>
					{APP_TEXT.save}
				</Button>
			</Popup>
		</>
	);
}
