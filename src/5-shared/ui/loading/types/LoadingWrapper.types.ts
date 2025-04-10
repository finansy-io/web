import {ReactNode} from 'react';

export type LoadingWrapperProps = {
	isLoading: boolean;
	className?: string;
	children?: ReactNode;
	loadingChildren?: ReactNode;
	isCircular?: boolean;
	isTextSm?: boolean;
	isTextBase?: boolean;
	isText3xl?: boolean;
	isFilledButton?: boolean;
	isIconButton?: boolean;
};
