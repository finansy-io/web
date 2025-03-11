import {useEffect, useState} from 'react';

export function useDebounce<T>(value: T, delay: number = 500): [T] {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Создаем таймер, который обновит значение с задержкой
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Очистка таймера, если значение изменилось до того, как прошло время задержки
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]); // Эффект срабатывает, когда изменяется value или delay

	return [debouncedValue]; // Возвращаем дебаунсированное значение
}
