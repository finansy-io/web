import {useEffect, useRef, useState} from 'react';

const SEARCH_SETTINGS = {
	defaultDelay: 500,
	timeout: undefined,
} as {
	defaultDelay: number;
	timeout: NodeJS.Timeout | undefined;
};

type UseDebouncedSearchProps = {
	initialValue?: string;
	value?: any;
	callbackFn: (value: any) => void;
	delay?: number;
};

export function useDebouncedSearch(props: UseDebouncedSearchProps) {
	const {initialValue = '', value, callbackFn, delay = SEARCH_SETTINGS.defaultDelay} = props;

	const [searchValue, setSearchValue] = useState(initialValue);

	useUpdateEffect(() => {
		setSearchValue(value);
	}, [value]);

	useUpdateEffect(() => {
		searchValue !== value && handleDebounce(searchValue);
	}, [searchValue]);

	const handleDebounce = (search = '') => {
		clearTimeout(SEARCH_SETTINGS.timeout);

		// SEARCH_SETTINGS.timeout = setTimeout(() => callbackFn(search), !search ? 0 : delay);
		SEARCH_SETTINGS.timeout = setTimeout(() => callbackFn(search), delay);
	};
	const handleSearchChange = (value: any) => setSearchValue(value);

	return {
		debouncedSearch: searchValue,
		onDebouncedSearchChange: handleSearchChange,
	};
}

function useUpdateEffect(callback: () => void, dependencies: any[]) {
	const firstRenderRef = useRef(true);

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}

		return callback();
	}, dependencies);
}
