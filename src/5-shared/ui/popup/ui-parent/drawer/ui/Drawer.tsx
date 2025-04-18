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
		onDrag,
	} = props;

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
					<div
						className={cn(
							'relative mx-auto flex h-full w-full max-w-md flex-col gap-4 p-4 pt-2',
							isLeftDrawer && 'pt-4',
						)}
					>
						{isLeftDrawer ? (
							<Button
								type='icon'
								onClick={() => setIsOpen(false)}
								icon={<Icon type='x' className='size-5' />}
								className='-m-2 self-start p-2'
							/>
						) : (
							<div
								className={cn(
									'mx-auto h-[3px] w-10 shrink-0 rounded-full',
									statusProgress ? 'bg-secondary-grey' : 'bg-[#BAC3CA]',
								)}
							>
								{!!statusProgress && (
									<div className='h-full rounded-full bg-[#BAC3CA]' style={{width: `${statusProgress}%`}} />
								)}
							</div>
						)}

						{statusIcon && <div className='flex items-center justify-center'>{statusIcon}</div>}

						{title || leftTitle || rightTitle ? (
							<div
								className={cn(
									(title || leftTitle || rightTitle) && 'flex h-[25.5px]',
									isStatusDrawer ? 'justify-center' : 'relative shrink-0 items-center justify-between',
								)}
							>
								{!isStatusDrawer && <div className='flex-shrink-0'>{leftTitle}</div>}
								{!isStatusDrawer && <div className='flex-shrink-0'>{rightTitle}</div>}

								<div className={cn(!isStatusDrawer && 'absolute left-1/2 top-0 -translate-x-1/2 text-center')}>
									<Title className='font-semibold'>{title}</Title>
								</div>
							</div>
						) : (
							<Title className='hidden'>{title}</Title>
						)}

						{children && <div className='flex flex-grow flex-col gap-4 overflow-y-auto'>{children}</div>}

						{actionButtonNode && <div className='-mx-2 -mb-2 mt-2 bg-light-grey px-2 pb-2'>{actionButtonNode}</div>}
					</div>
				</Content>
			</Portal>
		</Root>
	);
}
