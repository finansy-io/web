import {ReactElement, ReactNode} from 'react';
import type {ButtonConfig} from '@shared/ui';

export type HeaderProps = {
	stepsCount?: number;
	activeStepIndex?: number;

	backPath?: string;
	handleBackButtonClick?: () => void;
	iconButtonConfigs?: HeaderIconButtonConfig[];

	title?: string;
	description?: ReactNode;
	subDescription?: ReactNode;

	image?: ReactElement;

	buttonConfigs?: HeaderButtonConfig[];

	className?: string;
	isLoading?: boolean;
	withNoSpace?: boolean;
	withBackButton?: boolean;
};

export type HeaderIconButtonConfig = Omit<ButtonConfig, 'type' | 'name' | 'className'>;

export type HeaderButtonConfig = Omit<ButtonConfig, 'className' | 'type'> & {
	type: Extract<ButtonConfig['type'], 'primary' | 'secondary'>;
};
