import {STATUS_POPUP_TEXT} from '@shared/ui/popup/ui/status-popup/constants/StatusPopup.constants.tsx';

export type StatusTextKey = Extract<keyof typeof STATUS_POPUP_TEXT, string> extends `${infer Action}${
	| 'Success'
	| 'Error'}`
	? Action
	: never;

export type StatusPopupProps = {
	isSuccess: boolean;
	isError: boolean;
	statusTextKey: StatusTextKey;
	statusTextProps?: Record<string, unknown>;
};
