import {popupCloseDelay} from '../constants/Popup.constants.ts';
import {statusDuration} from '../ui/status-popup/constants/StatusPopup.constants.tsx';

export class PopupHelper {
	// Идентификатор отложенного таймаута
	private _pendingTimeout: ReturnType<typeof setTimeout> | null = null;
	// Отложенный callback
	private _pendingCallback: (() => void) | null = null;

	/**
	 * Регистрирует callback, который по умолчанию вызовется с задержкой (statusDuration + 500).
	 * Если пользователь закроет попап вручную, вызов произойдет мгновенно.
	 */
	runAfterStatusPopupClosed(fn: () => void) {
		this._pendingCallback = fn;
		this._pendingTimeout = setTimeout(() => {
			this._pendingTimeout = null;
			if (this._pendingCallback) {
				this._pendingCallback();
				this._pendingCallback = null;
			}
		}, statusDuration + 500);
	}

	/**
	 * Вызывается, когда пользователь закрыл попап вручную.
	 * Если был отложенный callback, то отложенный таймаут очищается,
	 * а callback выполняется сразу.
	 */
	userClosedPopup() {
		if (this._pendingTimeout && this._pendingCallback) {
			clearTimeout(this._pendingTimeout);
			this._pendingTimeout = null;
			const callback = this._pendingCallback;
			this._pendingCallback = null;
			setTimeout(callback, popupCloseDelay);
		}
	}

	runAfterPopupClosed(fn: () => void) {
		setTimeout(fn, popupCloseDelay);
	}
}

export const popupHelper = new PopupHelper();
