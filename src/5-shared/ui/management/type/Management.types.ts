import {ReactNode} from 'react';
import {EmptyTextKey} from '@shared/ui/list/types/List.types.ts';
import {type ButtonConfig} from '@shared/ui';
import {type Balance} from '@shared/types';

export type ManagementProps<ListItem> = {
	isLoading: boolean;
	totalBalance: Balance;
	totalBalanceDescription: ReactNode;
	buttonConfigs: ButtonConfig[];
	listTitle: ReactNode;
	listRightTitle?: ReactNode;
	listItems: ListItem[] | null;
	renderListItem: (item: ListItem) => ReactNode;
	hasNextListPage: boolean;
	fetchNextListPage: () => void;
	emptyListTextKey: EmptyTextKey;
	rightNode?: ReactNode;
};
