import {TextFieldHintsProps} from '../types/TextField.types.ts';
import {Button} from '@shared/ui';

export function TextFieldHints({hints, setTextFieldValue, visible}: TextFieldHintsProps) {
	if (!visible) return null;

	return (
		<div className='flex flex-wrap gap-2'>
			{hints.map((hint, index) => (
				<Button
					type='secondary'
					key={hint + index}
					className='w-fit px-2.5 py-1.5 text-sm'
					onClick={() => setTextFieldValue(hint)}
				>
					{hint}
				</Button>
			))}
		</div>
	);
}
