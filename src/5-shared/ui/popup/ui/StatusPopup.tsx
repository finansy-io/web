import {useEffect, useState} from 'react';
import {Drawer} from './Drawer.tsx';
import {STATUS_POPUP_TEXT, statusDuration} from '../constants/Popup.constants.tsx';
import {type StatusPopupProps} from '../types/StatusPopup.types.ts';
import {Icon} from '@shared/ui';
import {cn} from '@shared/lib';

export function StatusPopup({isSuccess, isError, statusTextKey, statusTextProps}: StatusPopupProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isDismissible, setIsDismissible] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	useEffect(() => {
		setIsOpen(isSuccess || isError);
	}, [isSuccess, isError]);

	// Запускаем логику показа и скрытия попапа
	useEffect(() => {
		if (!isOpen) return;

		setIsPopupOpen(true);

		const timeoutId = setTimeout(() => {
			setIsDismissible(true);
			setIsPopupOpen(false);
		}, statusDuration + 200);

		return () => clearTimeout(timeoutId);
	}, [isOpen]);

	// Анимация прогресса
	useEffect(() => {
		if (!isOpen) return;

		let animationFrameId: number;
		const start = performance.now();

		const animate = (time: number) => {
			const elapsed = time - start;
			const percentage = Math.min((elapsed / statusDuration) * 100, 100);
			setProgress(percentage);

			if (elapsed < statusDuration) {
				animationFrameId = requestAnimationFrame(animate);
			}
		};

		animationFrameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrameId);
	}, [isOpen]);

	const statusKeyWithSuffix = `${statusTextKey}${isSuccess ? 'Success' : 'Error'}` as const;

	return (
		<Drawer
			isOpen={isPopupOpen}
			setIsOpen={setIsOpen}
			isDismissible={isDismissible}
			progressSheet={
				<div className='mx-auto h-[3px] w-10 rounded-full bg-secondary-grey'>
					<div className='h-full rounded-full bg-[#BAC3CA]' style={{width: `${progress}%`}} />
				</div>
			}
		>
			<div className='flex flex-col items-center'>
				<Icon
					type={isSuccess ? 'success' : 'error'}
					className={cn('mb-4 mt-2 size-10', isSuccess && 'text-primary-violet', isError && 'text-error-red')}
				/>
				<div className='text-lg font-medium'>{STATUS_POPUP_TEXT[statusKeyWithSuffix](statusTextProps)}</div>
			</div>
		</Drawer>
	);
}
