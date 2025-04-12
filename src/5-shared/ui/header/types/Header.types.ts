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

export type HeaderIconButtonConfig = {
	icon: ReactElement;
	onClick: ButtonConfig['onClick'];
};

export type HeaderButtonConfig = {
	name: ButtonConfig['name'];
	type: Extract<ButtonConfig['type'], 'primary' | 'secondary'>;
	icon?: ReactElement;
	onClick: ButtonConfig['onClick'];
};
