import {ReactNode} from 'react';
import {type ButtonConfig} from '@shared/ui';
import {type Balance} from '@shared/types';

export type ManagementProps = {
	isLoading: boolean;
	totalBalance: Balance;
	totalBalanceDescription: ReactNode;
	buttonConfigs: ButtonConfig[];
	rightNode?: ReactNode;
	children: ReactNode;
};
