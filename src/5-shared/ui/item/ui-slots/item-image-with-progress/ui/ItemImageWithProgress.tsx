import {type ItemImageWithProgressProps} from '../types/ItemImageWithProgress.types.ts';

export const ItemImageWithProgress = ({image, current, target}: ItemImageWithProgressProps) => {
	const radius = 72;
	const circumference = 2 * Math.PI * radius;
	const progress = Math.min(current / target, 1); // Ограничиваем прогресс до 1 (100%)
	const strokeDashoffset = circumference * (1 - progress);

	return (
		<div className='relative size-fit'>
			{image}

			<div className='absolute left-[-13.5px] top-[-13.5px]'>
				<svg viewBox='0 0 300 300' width='100' height='100'>
					<circle cx='100' cy='100' r={radius} fill='transparent' stroke='#DFE3E7' strokeWidth='9' />
					<circle
						cx='100'
						cy='100'
						r={radius}
						fill='transparent'
						stroke={progress === 1 ? '#16A34A' : '#805CF5'}
						strokeWidth='9'
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
