import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ClassValue} from 'clsx';
import {type ButtonProps} from '../types/Button.types';
import {cn, styleElement, useKeyClick, useResponsive} from '@shared/lib';
import {LoadingWrapper, Spinner} from '@shared/ui';
import '../styles/Button.css';

export function Button(props: ButtonProps) {
	const {
		type = 'text',
		children,
		className,
		onClick,
		icon,
		disabled,
		isLoading,
		isPending,
		disabledPrimaryButtonEnterClick,
		secondaryWithPrimaryStyles,
		primaryButtonSpinnerClassName,
		isTextButtonOnGrey,
	} = props;

	const navigate = useNavigate();

	const [displayBoxShadow, setDisplayBoxShadow] = useState(true);

	const {isMobile, isTablet, isDesktop} = useResponsive();

	useKeyClick({
		key: 'Enter',
		onKeyDown: () => setDisplayBoxShadow(false),
		onKeyUp: () => {
			onClick({navigate});
			setDisplayBoxShadow(true);
		},
		disabled: disabled || disabledPrimaryButtonEnterClick || type !== 'primary' || isMobile || isTablet,
		deps: [],
	});

	function gcn(...buttonClassName: Array<ClassValue>) {
		const withBrightness = type === 'primary' || type === 'secondary' || type === 'circle';
		const withScale = type === 'circle' || type === 'text';

		return cn(
			'block duration-300 transition ease-in-out',
			disabled
				? 'cursor-not-allowed'
				: cn(
						'cursor-pointer',
						(isMobile || isTablet) && withScale && 'active:scale-95',
						isDesktop && withBrightness && 'hover:brightness-95',
						withBrightness && 'active:brightness-90',
				  ),
			...buttonClassName,
			className,
		);
	}

	const buttonProps = {
		onClick: disabled ? undefined : () => onClick({navigate}),
		disabled,
	};

	if (type === 'primary') {
		return (
			<button
				className={gcn(
					'primaryButtonShadow block w-full rounded-3xl bg-primary-violet px-4 py-3 text-center text-white active:shadow-none',
					disabled && 'bg-primary-violet/20 !shadow-none',
					isPending && 'cursor-not-allowed bg-primary-violet !shadow-none',
					!displayBoxShadow && '!shadow-none',
					className?.includes('shadow-none') && '!shadow-none',
				)}
				{...buttonProps}
			>
				{isPending ? (
					<div className='flex items-center justify-center gap-2'>
						<div className='relative'>
							<Spinner className={cn('absolute -left-7 top-1 text-white', primaryButtonSpinnerClassName)} />
							{children}
						</div>
					</div>
				) : (
					children
				)}
			</button>
		);
	}

	if (type === 'secondary') {
		return (
			<LoadingWrapper isLoading={!!isLoading} className='my-2 h-6 w-24 rounded-3xl'>
				<button
					{...buttonProps}
					className={gcn(
						'w-fit rounded-3xl bg-secondary-violet px-4 py-[10px] text-sm text-primary-violet',
						secondaryWithPrimaryStyles && 'w-full py-3 text-base',
						disabled && 'cursor-not-allowed bg-secondary-violet/20 text-white',
					)}
				>
					<div className='flex items-center justify-center gap-2'>
						{icon && <div>{styleElement(icon, 'size-[14px]')}</div>}
						{children && <div>{children}</div>}
					</div>
				</button>
			</LoadingWrapper>
		);
	}

	if (type === 'circle') {
		return (
			<button {...buttonProps} className={gcn('flex w-[68px] flex-col items-center')}>
				<LoadingWrapper isLoading={!!isLoading} className='size-11' isCircular>
					{icon && (
						<div
							className={cn(
								'flex size-11 items-center justify-center rounded-full bg-secondary-violet  text-primary-violet',
								disabled ? 'bg-secondary-violet/50 text-primary-violet/50' : 'bg-secondary-violet text-primary-violet',
							)}
						>
							{styleElement(icon, 'size-4')}
						</div>
					)}
				</LoadingWrapper>

				{children && (
					<div
						className={cn(
							'mt-2 text-xs',
							isLoading && 'mt-3',
							disabled ? 'text-primary-violet/50' : 'text-primary-violet',
						)}
					>
						<LoadingWrapper isLoading={!!isLoading} className='h-[12px] w-12'>
							{children}
						</LoadingWrapper>
					</div>
				)}
			</button>
		);
	}

	if (type === 'icon' && icon) {
		return (
			<button
				{...buttonProps}
				className={gcn(
					'flex items-center justify-center p-2 brightness-100 transition duration-200',
					// isDesktop && 'hover:text-primary-grey',
					(isMobile || isTablet) && 'active:text-primary-grey',
					isDesktop && 'rounded-full hover:bg-on-grey-hover active:bg-on-grey-active',
				)}
			>
				{icon}
			</button>
		);
	}

	if (type === 'text') {
		return (
			<button
				{...buttonProps}
				className={gcn(
					'w-fit text-sm font-medium text-primary-violet',
					icon && 'flex items-center gap-2',
					isDesktop &&
						cn(
							'-m-2 rounded-2xl p-2 transition duration-200',
							isTextButtonOnGrey
								? 'hover:bg-on-grey-hover active:bg-on-grey-active'
								: 'hover:bg-on-white-hover active:bg-on-white-active',
						),
				)}
			>
				{icon && styleElement(icon, 'size-3')}
				<span>{children}</span>
			</button>
		);
	}
}
