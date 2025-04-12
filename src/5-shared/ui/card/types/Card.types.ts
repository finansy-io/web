import {ReactNode} from 'react';

export type CardProps = {
	title?: ReactNode;
	rightTitle?: ReactNode;
	titleInCard?: ReactNode;
	rightTitleInCard?: ReactNode;
	children: ReactNode;
	isLoading?: boolean;
	isManagementCard?: boolean;
};
