import {useEffect, useState} from 'react';
import {Drawer} from '@shared/ui/popup/ui-parent/drawer/ui/Drawer.tsx';
import {STATUS_POPUP_TEXT, statusDuration} from '@shared/ui/popup/ui/status-popup/constants/StatusPopup.constants.tsx';
import {type StatusPopupProps} from '../types/StatusPopup.types.ts';
import {Icon} from '@shared/ui';
import {cn} from '@shared/lib';

export function StatusPopup({isSuccess, isError, statusTextKey, statusTextProps}: StatusPopupProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isDismissible, setIsDismissible] = useState(false);

	// Обновляем состояние попапа, когда изменяется статус
	useEffect(() => {
		setIsOpen(isSuccess || isError);
	}, [isSuccess, isError]);

	// Логика показа и скрытия попапа с задержкой
	useEffect(() => {
		if (!isOpen) return;

		const timeoutId = setTimeout(() => {
			setIsDismissible(true);
			setIsOpen(false);
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

	return (
		<Drawer
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title={STATUS_POPUP_TEXT[`${statusTextKey}${isSuccess ? 'Success' : 'Error'}`](statusTextProps)}
			statusDismissible={isDismissible}
			statusProgress={progress}
			statusIcon={
				<Icon
					type={isSuccess ? 'success' : 'error'}
					className={cn('mt-2 size-10', isSuccess && 'text-primary-violet', isError && 'text-error-red')}
				/>
			}
		/>
	);
}
