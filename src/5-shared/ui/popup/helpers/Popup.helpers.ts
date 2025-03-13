import {statusDuration} from '../constants/Popup.constants.tsx';

export class PopupHelpers {
	static runAfterStatusPopupClosed(fn: () => void) {
		setTimeout(fn, statusDuration + 500);
	}

	static runAfterPopupClosed(fn: () => void) {
		setTimeout(fn, 250);
	}
}
