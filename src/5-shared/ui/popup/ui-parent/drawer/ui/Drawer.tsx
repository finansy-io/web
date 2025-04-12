import {Drawer as VaulDrawer} from 'vaul';
import {DrawerProps} from '../types/Drawer.types.ts';
import {cn, isUndefined} from '@shared/lib';
import {Button, Icon} from '@shared/ui';

const {Root, Trigger, Close, Overlay, Content, Portal, Title} = VaulDrawer;

/**
 * странная разметка, чтобы работали
 * amount-field many options scroll
 * status popup
 * popup
 *
 * Title должен быть всегда
 * */

export function Drawer(props: DrawerProps) {
	const {
		isOpen,
		setIsOpen,
		leftTitle,
		title,
		rightTitle,
		children,
		actionButtonNode,
		statusProgress,
		statusIcon,
		direction = 'bottom',
		isFullScreen,
		isKeyboardActive,
		onDrag,
	} = props;
	// const keyboardOffset = useKeyboardOffset();

	const isLeftDrawer = direction === 'left';
	const isStatusDrawer = !isUndefined(statusProgress);

	return (
		<Root direction={direction} open={isOpen} onOpenChange={setIsOpen} onDrag={onDrag} dismissible={true}>
			<Trigger asChild>
				<button onClick={() => setIsOpen(true)} className='hidden' />
			</Trigger>
			<Close asChild>
				<button onClick={() => setIsOpen(false)} className='hidden' />
			</Close>

			<Portal>
				<Overlay className={cn('fixed inset-0', !isLeftDrawer && 'bg-black/40')} />

				<Content
					style={{
						...(isLeftDrawer ? {} : {maxWidth: '496px', margin: '0 auto'}),
						...(isFullScreen ? {height: '100vh'} : {}),
					}}
					className={cn(
						'fixed bottom-0 left-0 right-0 outline-none transition-all duration-200',
						isLeftDrawer
							? 'h-screen max-h-screen bg-light-grey/60 backdrop-blur-lg'
							: 'max-h-[98vh] rounded-t-[28px] bg-light-grey',
					)}
				>
					<div className='relative mx-auto flex h-full w-full max-w-md flex-col gap-4 p-2'>
						{isLeftDrawer ? (
							<Button
								type='icon'
								onClick={() => setIsOpen(false)}
								icon={<Icon type='x' className='size-5' />}
								className='self-start'
							/>
						) : (
							<div
								className={cn(
									'mx-auto h-[3px] w-10 rounded-full',
									statusProgress ? 'bg-secondary-grey' : 'bg-[#BAC3CA]',
								)}
							>
								{!!statusProgress && (
									<div className='h-full rounded-full bg-[#BAC3CA]' style={{width: `${statusProgress}%`}} />
								)}
							</div>
						)}

						{statusIcon && <div className='flex items-center justify-center'>{statusIcon}</div>}

						<div
							className={cn(
								(title || leftTitle || rightTitle) && 'flex px-2',
								isStatusDrawer ? 'mb-2 justify-center' : 'relative h-7 shrink-0 items-center justify-between',
							)}
						>
							{!isStatusDrawer && <div className='flex-shrink-0'>{leftTitle}</div>}
							{!isStatusDrawer && <div className='flex-shrink-0'>{rightTitle}</div>}

							<div className={cn(!isStatusDrawer && 'absolute left-1/2 top-0 -translate-x-1/2 text-center')}>
								<Title className={cn('text-[17px] font-semibold', !title && 'hidden')}>{title}</Title>
							</div>
						</div>

						{(children || actionButtonNode) && (
							<div className='relative flex flex-1 flex-col gap-4 overflow-y-auto p-2 pt-0'>
								{children}
								{actionButtonNode && (
									<div
										className='absolute bottom-0 left-0 right-0 bg-light-grey py-2 transition-[margin] duration-300'
										style={{
											marginBottom: isKeyboardActive ? 300 : 0,
										}}
									>
										{actionButtonNode}
									</div>
								)}
							</div>
						)}
					</div>
				</Content>
			</Portal>
		</Root>
	);
}

// export function useKeyboardOffset() {
// 	const [keyboardOffset, setKeyboardOffset] = useState(0);
// 	const [initialHeight, setInitialHeight] = useState<number | null>(null);
//
// 	useEffect(() => {
// 		// Сохраняем исходную высоту экрана
// 		setInitialHeight(window.innerHeight);
//
// 		const handleResize = () => {
// 			// Если visualViewport не работает корректно, используем window.innerHeight
// 			const currentHeight = window.innerHeight;
// 			if (initialHeight !== null) {
// 				// Если текущее окно меньше исходного, считаем, что клавиатура открыта
// 				const offset = initialHeight - currentHeight;
// 				setKeyboardOffset(offset > 0 ? offset : 0);
// 			}
// 		};
//
// 		window.addEventListener('resize', handleResize);
// 		handleResize(); // Инициализация
//
// 		return () => {
// 			window.removeEventListener('resize', handleResize);
// 		};
// 	}, [initialHeight]);
//
// 	return keyboardOffset;
// }
