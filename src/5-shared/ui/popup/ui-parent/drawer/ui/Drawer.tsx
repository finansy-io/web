import {Drawer as VaulDrawer} from 'vaul';
import {DrawerProps} from '../types/Drawer.types.ts';
import {cn} from '@shared/lib';
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

		statusDismissible,
		statusProgress,
		statusIcon,
		direction = 'bottom',
	} = props;

	const isLeftDrawer = direction === 'left';

	return (
		<Root direction={direction} open={isOpen} onOpenChange={setIsOpen} dismissible={statusDismissible}>
			<Trigger asChild>
				<button onClick={() => setIsOpen(true)} className='hidden' />
			</Trigger>
			<Close asChild>
				<button onClick={() => setIsOpen(false)} className='hidden' />
			</Close>

			<Portal>
				<Overlay className={cn('fixed inset-0', !isLeftDrawer && 'bg-black/40')} />

				<Content
					style={isLeftDrawer ? undefined : {maxWidth: '496px', margin: '0 auto'}}
					className={cn(
						'fixed bottom-0 left-0 right-0 outline-none transition-all duration-200',
						isLeftDrawer
							? 'h-screen max-h-screen bg-light-grey/60 backdrop-blur-lg'
							: 'max-h-[94vh] rounded-t-[28px] bg-light-grey',
					)}
				>
					<div className='mx-auto flex h-full w-full max-w-md flex-col gap-4 p-2'>
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
								'relative',
								(title || leftTitle || rightTitle) && 'flex h-7 items-center justify-between px-2',
								!!statusProgress && 'mb-2',
							)}
						>
							<div className='flex-shrink-0'>{leftTitle}</div>
							<div className='flex-shrink-0'>{rightTitle}</div>

							{/* Абсолютно позиционированный по центру Title */}
							<div className='absolute inset-0 flex items-center justify-center'>
								<Title className={cn('text-center text-lg font-medium', !title && 'hidden')}>{title}</Title>
							</div>
						</div>

						{(children || actionButtonNode) && (
							<div className='flex max-h-[90vh] flex-1 flex-col gap-4 overflow-y-auto p-2 pt-0'>
								{children}
								{actionButtonNode && <div className='bg-light-grey py-2'>{actionButtonNode}</div>}
							</div>
						)}
					</div>
				</Content>
			</Portal>
		</Root>
	);
}
