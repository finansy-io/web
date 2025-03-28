import {useEffect, useState} from 'react';

export function useSelectSortingValue<Value>(isPopupOpen: boolean, value: Value) {
	const [sortingValue, setSortingValue] = useState(value);

	useEffect(() => {
		if (value === sortingValue) return;
		setSortingValue(value);
	}, [value]);

	useEffect(() => {
		if (!isPopupOpen) {
			setSortingValue(value);
		}
	}, [isPopupOpen]);

	return {sortingValue, setSortingValue};
}
