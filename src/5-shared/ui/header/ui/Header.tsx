import {useNavigate} from 'react-router-dom';
import {HeaderProps} from '../types/Header.types.ts';
import {Button, Icon} from '@shared/ui';
import {cn, isNumber, styleElement} from '@shared/lib';

export function Header(props: HeaderProps) {
	const {
		title,
		description,
		subDescription,
		image,
		backPath,
		handleBackButtonClick,
		withBackButton = true,
		withNoSpace,
		stepsCount,
		activeStepIndex,
		className,
		buttonConfigs,
		isLoading,
	} = props;

	const navigate = useNavigate();

	function onBackButtonClick() {
		if (handleBackButtonClick) return handleBackButtonClick();
		backPath ? navigate(backPath) : navigate(-1);
	}

	return (
		<div role='page-header' className={cn('mb-6 w-full pt-2', withNoSpace && 'p-0', className)}>
			{isNumber(stepsCount) && isNumber(activeStepIndex) && (
				<div className='mb-1 flex w-full gap-1 px-2'>
					{Array.from({length: stepsCount}).map((item, index) => (
						<div
							key={cn(item as any, index)}
							className={cn(
								'h-0.5 w-full rounded-3xl bg-primary-grey opacity-40',
								index <= activeStepIndex && 'opacity-1 bg-black',
							)}
						/>
					))}
				</div>
			)}

			{withBackButton && (
				<Button
					type='icon'
					icon={
						<div className='flex items-center justify-center'>
							<Icon type='backButton' className='size-5' />
						</div>
					}
					onClick={onBackButtonClick}
					className={cn(
						'ml-2',
						withNoSpace && 'm-0 -ml-2',
						// isDesktop && 'hover:bg-inherit active:bg-inherit active:text-primary-grey',
					)}
				/>
			)}

			<div className={cn('flex items-start justify-between gap-4 px-4', withNoSpace && 'p-0')}>
				<div>
					<div className='flex flex-col items-start gap-4'>
						{title && (
							<div className='flex w-full items-center justify-between'>
								<div className='text-3xl font-bold'>{title}</div>
							</div>
						)}
						{description && <div className='font-medium'>{description}</div>}
						{subDescription && <div className='text-sm font-light text-primary-grey'>{subDescription}</div>}
					</div>

					{buttonConfigs && (
						<div className='mt-4 flex gap-2'>
							{buttonConfigs.map(({name, ...restButtonConfig}, index) => (
								<Button key={index} isLoading={isLoading} {...restButtonConfig}>
									{name}
								</Button>
							))}
						</div>
					)}
				</div>

				{image && styleElement(image, 'size-10')}
			</div>
		</div>
	);
}
