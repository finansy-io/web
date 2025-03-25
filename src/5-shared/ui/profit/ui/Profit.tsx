import {Icon} from '@shared/ui';

export function Profit() {
	return (
		<div className='flex items-center gap-2 text-red-600'>
			<div>-1 700.28 $</div>
			<div className='flex items-center gap-1'>
				<Icon type='profitDown' className='size-1.5' />
				<div>30%</div>
			</div>
		</div>
	);
}
