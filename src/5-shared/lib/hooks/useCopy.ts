import {useState} from 'react';

export function useCopy(timeout = 2000) {
	const [isCopied, setIsCopied] = useState(false);

	async function copy(text: string) {
		if (!navigator.clipboard) {
			const textArea = document.createElement('textarea');
			textArea.value = text;
			document.body.appendChild(textArea);
			textArea.select();
			try {
				document.execCommand('copy');
				setIsCopied(true);
			} catch (err) {
				console.error('Fallback: Ошибка при копировании', err);
				setIsCopied(false);
			}
			document.body.removeChild(textArea);
			return;
		}

		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);
		} catch (err) {
			console.error('Ошибка при копировании', err);
			setIsCopied(false);
		}

		// Автоматический сброс состояния
		setTimeout(() => setIsCopied(false), timeout);
	}

	return {isCopied, copy};
}
