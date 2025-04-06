import {type ItemImageWithProgressProps} from '../types/ItemImageWithProgress.types.ts';

export const ItemImageWithProgress = ({image, current, target}: ItemImageWithProgressProps) => {
	const radius = 73;
	const circumference = 2 * Math.PI * radius;
	const progress = current / target;
	const strokeDashoffset = circumference * (1 - progress);

	return (
		<div className='relative size-fit'>
			{image}

			<div className='absolute left-[-13.5px] top-[-13.5px]'>
				<svg viewBox='0 0 300 300' width='100' height='100'>
					<circle cx='100' cy='100' r={radius} fill='transparent' stroke='#DFE3E7' strokeWidth='10' />
					<circle
						cx='100'
						cy='100'
						r={radius}
						fill='transparent'
						stroke='#805CF5'
						strokeWidth='10'
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						transform='rotate(-90 100 100)'
						strokeLinecap='round'
					/>
				</svg>
			</div>
		</div>
	);
};
