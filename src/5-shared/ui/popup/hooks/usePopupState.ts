import {useEffect, useState} from 'react';

export function usePopupState({initialState = false}: {initialState?: boolean} = {}) {
	const [isOpen, setIsOpen] = useState(initialState);

	useEffect(() => {
		setIsOpen(initialState);
	}, [initialState]);

	function openPopup() {
		setIsOpen(true);
	}
	function closePopup() {
		setIsOpen(false);
	}

	return {
		popupProps: {isOpen, setIsOpen},
		openPopup,
		closePopup,
	};
}
