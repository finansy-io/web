import {MouseEvent, useEffect, useRef, useState} from 'react';
import {TextFieldProps} from '../types/TextField.types.ts';
import {cn, useKeyClick, useResponsive} from '@shared/lib';
import {Button, Icon} from '@shared/ui';

//  when isSearch and focused, pin search-input to the top with animation + cancel text at right (separate component?)

export function TextField(props: TextFieldProps) {
	const {
		value,
		onChange,
		placeholder,
		maxLength,
		isSearch,
		type = 'text',
		description,
		errorText,
		enterKeyHint = 'done',
		isFocused,
		setIsFocused,
		disabledEnterClick,
		hints,
	} = props;

	const {isMobile, isTablet, isDesktop} = useResponsive();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const showHidePasswordIconRef = useRef<HTMLDivElement>(null);

	// Когда мобилка и планшет, enter клик закрывает клавиатуру
	useKeyClick({
		key: 'Enter',
		onKeyUp: () => {
			inputRef.current?.blur();
			setIsFocused?.(false);
		},
		disabled: isDesktop || disabledEnterClick,
		deps: [isFocused],
	});

	// Синхронизируем isFocused state с input state
	useEffect(() => {
		if (isFocused && inputRef.current !== document.activeElement) {
			inputRef.current?.focus();
		}
		if (!isFocused) {
			inputRef.current?.blur();
		}
	}, [isFocused]);

	function focusInput(event?: MouseEvent<HTMLDivElement>) {
		// Если был ли клик по иконке show / hide password - не фокусируем input
		if (showHidePasswordIconRef.current?.contains(event?.target as Node)) return;

		inputRef.current?.focus();
		setIsFocused?.(true);
	}

	function handleChange(value: string) {
		if (maxLength && value.length > maxLength) return;
		onChange(value);
	}

	return (
		<div className={cn(hints && 'flex flex-col gap-4')}>
			<div role='text-field'>
				<div
					className={cn(
						'group flex cursor-text items-center rounded-2xl bg-field p-4 transition-colors duration-300 ease-in-out focus-within:bg-field-state',
						isDesktop && 'hover:bg-field-state',
						!!errorText && '!bg-secondary-error-red',
						isSearch && 'rounded-3xl px-3 py-1',
					)}
					onClick={focusInput}
				>
					{isSearch && <Icon type='search' className='mr-2 size-4 text-primary-grey' />}

					<input
						ref={inputRef}
						className={cn(
							'w-full bg-inherit  font-light caret-primary-violet outline-none',
							!!errorText && 'caret-error-red',
							isSearch && 'py-1 text-sm',
						)}
						type={type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type}
						inputMode={type === 'email' ? 'email' : 'text'}
						value={value}
						onChange={(event) => handleChange(event.target.value)}
						placeholder={placeholder}
						enterKeyHint={enterKeyHint}
						onFocus={() => setIsFocused?.(true)}
						onBlur={() => setIsFocused?.(false)}
					/>

					{value && type !== 'password' && (
						<div
							className={cn(
								'ml-2 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-field-helper transition duration-300',
								(isMobile || isTablet) && 'active:scale-95 active:brightness-95',
								isDesktop && 'hover:bg-field-helper-hover active:bg-field-helper-active',
							)}
							onClick={() => onChange('')}
						>
							<Icon
								type='x'
								className={cn(
									'size-3.5 text-field duration-300 ease-in-out group-focus-within:text-secondary-grey',
									isDesktop && 'group-hover:text-secondary-grey',
								)}
							/>
						</div>
					)}

					{value && type === 'password' && (
						<div
							ref={showHidePasswordIconRef}
							className={cn(
								'ml-2 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-field-helper transition duration-300',
								(isMobile || isTablet) && 'active:scale-95 active:brightness-95',
								isDesktop && 'hover:text-field-helper-hover active:text-field-helper-active',
							)}
							onClick={() => setIsPasswordVisible(!isPasswordVisible)}
						>
							<Icon
								type={isPasswordVisible ? 'hide' : 'show'}
								className={isPasswordVisible ? 'size-[21px]' : 'size-5'}
							/>
						</div>
					)}
				</div>

				{(description || maxLength) && (
					<div className='flex cursor-default px-4 py-1 text-xs font-light text-field-helper'>
						{description && <div>{description}</div>}
						{errorText && <div className='text-error-red'>{errorText}</div>}
						{maxLength && (
							<div className='ml-auto'>
								{value.length} / {maxLength}
							</div>
						)}
					</div>
				)}
			</div>

			{!value && (
				<div role='text-field-hints' className='flex flex-wrap gap-2'>
					{hints?.map((hint, index) => (
						<Button
							type='secondary'
							key={hint + index}
							className='w-fit px-2.5 py-1.5 text-sm'
							onClick={() => onChange(hint)}
						>
							{hint}
						</Button>
					))}
				</div>
			)}
		</div>
	);
}
