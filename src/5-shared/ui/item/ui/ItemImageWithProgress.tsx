import Chart from 'react-apexcharts';
import {type ItemImageWithProgressProps} from '../types/ItemImageWithProgress.types.ts';
import {options} from '../config/ItemImageWithProgress.config.ts';

export const ItemImageWithProgress = ({image, current, target}: ItemImageWithProgressProps) => {
	const series = [current, target - current];

	return (
		<div className='relative size-fit'>
			{image}

			<div className='absolute left-[-13px] top-[-13px] size-[66px]'>
				<Chart options={options} series={series} type='donut' width='100%' height='100%' />
			</div>
		</div>
	);
};
