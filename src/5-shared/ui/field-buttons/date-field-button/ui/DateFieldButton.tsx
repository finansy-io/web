import {useState} from 'react';
import {DateFieldButtonProps} from '../types/DateFieldButton.types.ts';
import {FieldButton} from '../../ui-parent';
import {Button, Calendar, Popup, usePopupState} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {DateService, isNull} from '@shared/lib';

/**
 * Refactor as TextFieldButton
 * */

export function DateFieldButton(props: DateFieldButtonProps) {
	const {value, onChange, children, minDate, title, withReset, isTextButtonOnGrey} = props;

	const [localValue, setLocalValue] = useState(value);

	const {
		popupProps: {isOpen, setIsOpen},
		openPopup,
		closePopup,
	} = usePopupState();

	const isChanged = (() => {
		if (isNull(value) && isNull(localValue)) {
			return false;
		}

		if (isNull(value) && !isNull(localValue)) {
			return true;
		}

		if (!isNull(value) && isNull(localValue)) {
			return true;
		}

		if (!!value && !!localValue) {
			return !new DateService(localValue).isEqualTo(value);
		}
	})();

	return (
		<>
			<FieldButton openPopup={openPopup} isTextButtonOnGrey={isTextButtonOnGrey} isEdit={!!localValue}>
				{children}
			</FieldButton>

			<Popup
				isOpen={isOpen}
				setIsOpen={(open) => {
					setIsOpen(open);

					if (!open && isChanged) {
						setLocalValue(value);
					}
				}}
				title={title}
				actionButtonNode={
					<Button
						type='primary'
						onClick={() => {
							onChange(localValue);
							closePopup();
						}}
						disabled={!isChanged}
					>
						{APP_TEXT.save}
					</Button>
				}
			>
				<div className='flex w-full justify-center'>
					<Calendar value={localValue} onChange={setLocalValue} minDate={minDate} withReset={withReset} />
				</div>
			</Popup>
		</>
	);
}
