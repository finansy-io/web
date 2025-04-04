import {DayPicker} from 'react-day-picker';
import {buttonVariants} from '@shared/ui/field-buttons/date-field-button/ui-parent/calendar/config/Calendar.config.ts';
import {CalendarProps} from '../types/DateField.types.ts';
import {cn, DateService, useResponsive} from '@shared/lib';
import {Button, Icon} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

// Когда меняем на новую дату ставится дефолтное время. Продумать логику.

export function Calendar(props: CalendarProps) {
	const {value, onChange, minDate, withReset = true} = props;

	const {isMobile} = useResponsive();

	return (
		<div className='rounded-2xl bg-white p-2'>
			<div className='mb-2 flex justify-between px-2 text-sm'>
				<div className='text-primary-grey'>{value ? new DateService(value).getLocalDateString() : APP_TEXT.noDate}</div>
				{withReset && value && (
					<Button type='text' onClick={() => onChange(null)}>
						Reset
					</Button>
				)}
			</div>

			<DayPicker
				mode='single'
				selected={value ?? undefined}
				onSelect={(value) => onChange(value as Date | null)}
				showOutsideDays={true}
				className={'w-fit'}
				fromDate={minDate}
				classNames={{
					months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
					month: 'space-y-4',
					caption: 'flex justify-center pt-1 relative items-center',
					caption_label: 'text-sm font-medium',
					nav: 'space-x-1 flex items-center',
					nav_button: cn(
						buttonVariants({variant: 'outline'}),
						'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
					),
					nav_button_previous: cn('absolute left-1', isMobile && 'mobile-calendar-button active:bg-light-grey'),
					nav_button_next: cn('absolute right-1', isMobile && 'mobile-calendar-button active:bg-light-grey'),
					table: 'w-full border-collapse space-y-1',
					head_row: 'flex mb-2',
					head_cell: 'text-neutral-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-neutral-400',
					row: 'flex w-full',
					cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-neutral-100/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50 dark:[&:has([aria-selected])]:bg-neutral-800',
					day: cn(
						buttonVariants({variant: 'ghost'}),
						'h-8 w-8 font-normal aria-selected:opacity-100 hover:bg-secondary-grey rounded-full',
					),
					day_range_end: 'day-range-end',
					day_selected:
						'!bg-primary-violet !text-white text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900',
					day_today: 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50',
					day_outside:
						'day-outside text-neutral-500 opacity-50 aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500 aria-selected:opacity-30 dark:text-neutral-400 dark:aria-selected:bg-neutral-800/50 dark:aria-selected:text-neutral-400',
					day_disabled: 'text-neutral-500 opacity-50 dark:text-neutral-400',
					day_range_middle:
						'aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50',
					day_hidden: 'invisible',
				}}
				components={{
					IconLeft: ({...props}) => <Icon type='chevronLeft' className='size-3' />,
					IconRight: ({...props}) => <Icon type='chevronRight' className='size-3' />,
				}}
				ISOWeek
				{...props}
			/>
		</div>
	);
}

Calendar.displayName = 'Calendar';
