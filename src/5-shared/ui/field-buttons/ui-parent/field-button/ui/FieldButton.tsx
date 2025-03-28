import {FieldButtonProps} from '../types/FieldButton.types.ts';
import {Button, Icon, LoadingWrapper} from '@shared/ui';

export function FieldButton({openPopup, isEdit, isLoading, isTextButtonOnGrey, children}: FieldButtonProps) {
	return (
		<LoadingWrapper isLoading={!!isLoading} isTextSm>
			<Button
				type='text'
				onClick={openPopup}
				icon={isEdit ? <Icon type='edit' /> : <Icon type='plus' />}
				isTextButtonOnGrey={isTextButtonOnGrey}
			>
				{children}
			</Button>
		</LoadingWrapper>
	);
}
