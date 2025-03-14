import {ReactNode} from 'react';

export function AmountFieldDetails({label, field}: {label: string; field: ReactNode}) {
	return (
		<div className='flex justify-between px-4 text-sm'>
			<div className='font-medium text-primary-grey'>{label}</div>
			{field}
		</div>
	);
}
