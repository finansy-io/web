import {type SelectTabsProps} from '../types/SelectField.types.ts';
import {cn} from '@shared/lib';

export function SelectTabs<Value>(props: SelectTabsProps<Value>) {
	const {value, onChange, options} = props;

	return (
		<div className='flex flex-wrap gap-1'>
			{options.map(({name, value: optionValue}, index) => (
				<div
					key={index}
					className={cn(
						'cursor-pointer rounded-3xl px-3 py-2 text-sm transition duration-200',
						value === optionValue ? 'bg-white' : 'bg-inherit text-primary-grey',
					)}
					onClick={() => onChange(optionValue)}
				>
					{name}
				</div>
			))}
		</div>
	);
}
