import {useEffect, useState} from 'react';
import {type SelectWithSearchOption, SelectWithSearchFieldProps} from '../types/SelectWithSearchField.types.ts';
import {Card, Icon, Item, TextField} from '@shared/ui';
import {APP_TEXT, CURRENCY} from '@shared/constants';
import {cn} from '@shared/lib';

/**
 * GoalCreate - choose currency
 * GoalEdit - <EditButtonField<CURRENCY> types='select' />
 */

export function SelectWithSearchField(props: SelectWithSearchFieldProps) {
	const {options, onChange, value} = props;

	const [selectOptions, setSelectOptions] = useState<(SelectWithSearchOption & {checked: boolean})[] | null>(null);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const initialOptions = options?.map((option) => ({
			...option,
			checked: option.value === value,
		}));

		const filteredOptions = !initialOptions?.filter((option) => option.checked).length
			? initialOptions?.map((option, index) => (index === 0 ? {...option, checked: true} : option))
			: initialOptions;

		setSelectOptions(filteredOptions ? filteredOptions : null);
	}, [value]);

	function handleOptionClick(value: CURRENCY) {
		if (!selectOptions) return;

		const updatedOptions = selectOptions.map((selectOption) => {
			if (selectOption.value === value) {
				return {...selectOption, checked: true};
			}
			return {...selectOption, checked: false};
		});

		setSelectOptions(updatedOptions);
		onChange(value);
	}

	return (
		<div className='flex flex-col gap-4'>
			<TextField value={search} onChange={setSearch} placeholder={APP_TEXT.search} isSearch />

			<Card>
				{selectOptions
					?.filter((option) =>
						search.length ? (option.name + option.description).toLowerCase().includes(search.toLowerCase()) : true,
					)
					.map((option) => (
						<Item
							key={option.name}
							className={cn(option.checked && 'bg-light-grey')}
							image={<div className={'size-10 rounded-full bg-primary-grey'} />}
							imageIcon={option.checked && <Icon type='check' />}
							name={option.name}
							description={option.description}
							onClick={() => handleOptionClick(option.value)}
						/>
					))}
			</Card>
		</div>
	);
}
