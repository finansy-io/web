import {FieldPopupProps} from '../types/FieldPopup.ts';
import {Button} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {Drawer} from '@shared/ui/popup/ui-parent/drawer/ui/Drawer.tsx';

export function FieldPopup<V>(props: FieldPopupProps<V>) {
	const {
		isEdit,
		entityName,
		popupProps,
		isChanged,
		setValue,
		initialValue,
		handleUpdate,
		value,
		isPending,
		isKeyboardActive,
		children,
	} = props;

	return (
		<Drawer
			title={isEdit ? APP_TEXT.edit + ' ' + entityName.toLowerCase() : entityName}
			isOpen={popupProps.isOpen}
			setIsOpen={(open) => {
				if (!open && isChanged) {
					setValue(initialValue);
				}

				popupProps.setIsOpen(open);
			}}
			actionButtonNode={
				<Button
					type='primary'
					onClick={() => handleUpdate(value)}
					isPending={isPending}
					disabled={!isChanged || !value}
				>
					{APP_TEXT.save}
				</Button>
			}
			isKeyboardActive={isKeyboardActive}
			isFullScreen
		>
			{children}
		</Drawer>
	);
}
