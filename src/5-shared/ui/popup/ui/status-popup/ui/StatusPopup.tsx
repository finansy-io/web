import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {type StatusPopupProps} from '../types/StatusPopup.types.ts';
import {STATUS_POPUP_TEXT, statusDuration, statusManualCloseDelay} from '../constants/StatusPopup.constants.tsx';
import {popupHelper} from '../../../helpers/Popup.helpers.ts';
import {Drawer} from '../../../ui-parent/drawer/ui/Drawer.tsx';
import {Icon} from '@shared/ui';
import {cn} from '@shared/lib';

export function StatusPopup({isSuccess, isError, statusTextKey, statusTextProps, onDismiss}: StatusPopupProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [progress, setProgress] = useState(0);
	const navigate = useNavigate();

	const closedByUserRef = useRef(false);
	const autoDismissTimerIdRef = useRef<number | null>(null);

	function handleDismiss() {
		onDismiss?.(navigate, isSuccess);
	}

	useEffect(() => {
		setIsOpen(isSuccess || isError);
		closedByUserRef.current = false;
	}, [isSuccess, isError]);

	// Логика показа и скрытия попапа с автоматическим dismiss
	useEffect(() => {
		if (!isOpen) return;

		const openTimeoutId = setTimeout(() => {
			setIsOpen(false);
		}, statusDuration + 200);

		autoDismissTimerIdRef.current = window.setTimeout(() => {
			if (!closedByUserRef.current) {
				handleDismiss();
			}
		}, statusDuration + 500);

		return () => {
			clearTimeout(openTimeoutId);
			// Важно: здесь мы не очищаем autoDismissTimerIdRef.current,
		};
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

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [isOpen]);

	return (
		<Drawer
			isOpen={isOpen}
			setIsOpen={(open) => {
				if (!open && isOpen) {
					closedByUserRef.current = true;
					popupHelper.userClosedPopup();
					if (autoDismissTimerIdRef.current) {
						clearTimeout(autoDismissTimerIdRef.current);
						autoDismissTimerIdRef.current = null;
					}
					setIsOpen(false);
					setTimeout(handleDismiss, statusManualCloseDelay);
				} else {
					setIsOpen(open);
				}
			}}
			title={STATUS_POPUP_TEXT[`${statusTextKey}${isSuccess ? 'Success' : 'Error'}`](statusTextProps)}
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
