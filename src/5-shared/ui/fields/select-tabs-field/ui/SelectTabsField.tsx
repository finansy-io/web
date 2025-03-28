import {type SelectTabsProps} from '../types/SelectTabsField.ts';
import {cn, useResponsive} from '@shared/lib';

export function SelectTabsField<Value>(props: SelectTabsProps<Value>) {
	const {value, onChange, options} = props;

	const {isMobile, isTablet, isDesktop} = useResponsive();

	return (
		<div className='flex flex-wrap justify-center gap-1'>
			{options.map(({name, value: optionValue}, index) => (
				<div
					key={index}
					className={cn(
						'rounded-3xl px-3 py-2 text-sm transition duration-200',
						value === optionValue ? 'bg-white' : 'cursor-pointer bg-inherit text-primary-grey',
						(isMobile || isTablet) && 'active:text-black',
						isDesktop && value !== optionValue && 'hover:bg-on-grey-hover active:bg-on-grey-active',
					)}
					onClick={() => onChange(optionValue)}
				>
					{name}
				</div>
			))}
		</div>
	);
}
