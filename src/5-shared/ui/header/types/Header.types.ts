import {ReactElement, ReactNode} from 'react';
import type {ButtonConfig} from '@shared/ui';

export type HeaderProps = {
	title?: string;
	description?: ReactNode;
	subDescription?: ReactNode;
	image?: ReactElement;
	backPath?: string;
	handleBackButtonClick?: () => void;
	withBackButton?: boolean;
	stepsCount?: number;
	activeStepIndex?: number;
	className?: string;
	buttonConfigs?: ButtonConfig[];
	isLoading?: boolean;
	withNoSpace?: boolean;
};
