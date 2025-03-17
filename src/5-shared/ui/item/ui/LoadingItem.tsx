import {PreloadSkeleton} from '../../loading-wrapper/ui/PreloadSkeleton.tsx';

// Наследуется от PreloadSkeleton, но лежит рядом с /item
// т.к. рендерится самостоятельно, прокидывается в слоты и не является враппером
// Кейс схож и CardSelectTitle - там и card, и select, но лежит рядом с card.

export function LoadingItem({withRightName}: {withRightName?: boolean}) {
	return (
		<div className='rounded-2xl bg-white px-4 py-[18px]'>
			<div className='flex'>
				<PreloadSkeleton className='size-10' isCircular />

				<div className='ml-4 flex flex-1 flex-col justify-between py-0.5'>
					<PreloadSkeleton className='h-4 w-32' />
					<PreloadSkeleton className='h-3 w-16' />
				</div>

				{withRightName && (
					<div className='flex flex-col items-end justify-between'>
						<PreloadSkeleton className='my-0.5 h-4 w-10' />
						{/*<PreloadSkeleton className='h-3 w-6' />*/}
					</div>
				)}
			</div>
		</div>
	);
}
