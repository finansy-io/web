import {type ConfirmationPopupProps} from '../types/ConfirmationPopup.types.ts';
import {Button, Popup} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

export function ConfirmationPopup(props: ConfirmationPopupProps) {
	const {title, description, actionButtonText, onActionClick, isActionPending, close, ...restPopupProps} = props;

	return (
		<Popup {...restPopupProps} title={title}>
			<div className='text-center'>{description}</div>
			<div className='mt-2 flex gap-2'>
				<Button type='secondary' onClick={close} secondaryWithPrimaryStyles>
					{APP_TEXT.cancel}
				</Button>
				<Button
					type='primary'
					onClick={onActionClick}
					isPending={isActionPending}
					className='bg-red-100 text-red-600 shadow-none'
					primaryButtonSpinnerClassName='text-red-600'
				>
					{actionButtonText ? actionButtonText : APP_TEXT.delete}
				</Button>
			</div>
		</Popup>
	);
}
