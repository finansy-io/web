import zod, {boolean, nativeEnum, number, object, string} from 'zod';
import {CURRENCY, TRANSACTION_TYPE} from '@shared/constants';
import {type Payload} from '@shared/api';
import {balanceValidator} from '@shared/types';

export type Props = {
	useItems: {
		filter?: Payload;
		queryKey?: string;
	};

	useItemDetails: {
		id?: string;
	};

	useItemTransactions: {
		id?: string;
	};
};

export type MutationProps = {
	useCreateItem: {
		payload: {
			name: string;
			currency: CURRENCY;
			targetAmount?: number;
			deadline?: string;
		};
	};

	useUpdateItem: {
		params: {
			id: string;
		};
		payload: {
			name: string;
			currency: CURRENCY;
			targetAmount?: number;
			deadline?: string | null;
		};
	};

	useDeleteItem: {
		params: {
			id: string;
		};
	};

	useFund: {
		params: {
			id: string;
		};
		payload: {
			amount: number;
			date: string;
		};
	};

	useWithdraw: {
		params: {
			id: string;
		};
		payload: {
			amount: number;
			date: string;
		};
	};

	useTransfer: {
		payload: {
			fromGoalId: string | number;
			fromGoalAmount: number;
			toGoalId: string | number;
			toGoalAmount: number;
			date: string;
		};
	};
};

export type ApiProps = {
	fetchItems: {
		params: {boardGoalId: number};
		payload: Props['useItems']['filter'];
	};

	fetchItemDetails: {
		params: {id: Props['useItemDetails']['id']; boardGoalId: number};
	};

	fetchItemTransactions: {
		params: {id: Props['useItemTransactions']['id']; boardGoalId: number};
		payload?: Payload;
	};

	createItem: {
		params: {boardGoalId: number};
		payload: MutationProps['useCreateItem']['payload'];
	};

	updateItem: {
		params: MutationProps['useUpdateItem']['params'] & {boardGoalId: number};
		payload: MutationProps['useUpdateItem']['payload'];
	};

	deleteItem: {
		params: MutationProps['useDeleteItem']['params'] & {boardGoalId: number};
	};

	depositMoney: {
		params: MutationProps['useFund']['params'] & {boardGoalId: number};
		payload: MutationProps['useFund']['payload'] & {type: TRANSACTION_TYPE};
	};

	withdrawMoney: {
		params: MutationProps['useWithdraw']['params'] & {boardGoalId: number};
		payload: MutationProps['useWithdraw']['payload'] & {type: TRANSACTION_TYPE};
	};

	transferMoney: {
		params: {boardGoalId: number};
		payload: MutationProps['useTransfer']['payload'];
	};
};

export const responseValidator = {
	fetchItems: object({
		info: object({
			hasNext: boolean(),
			pageNumber: number(),
			pageSize: number(),
		}),
		items: object({
			id: number(),
			name: string(),
			balance: balanceValidator,
			targetAmount: number().nullish(),
			image: string().nullable(),
		}).array(),
	}),

	fetchItem: object({
		id: number(),
		name: string(),
		balance: balanceValidator,
		targetAmount: number().nullish(),
		deadline: string().nullish(),
	}),

	// items[i] может быть type=transfer и там будет один validator, а может быть другой и будет другой валидатор
	fetchItemTransactions: object({
		info: object({
			hasNext: boolean(),
			pageNumber: number(),
			pageSize: number(),
		}),
		items: zod
			.object({
				id: number(),
				type: nativeEnum(TRANSACTION_TYPE),
				amount: number().nullish(),
				date: string().nullish(),

				fromGoalAmount: number().nullish(),
				fromGoalName: string().nullish(),
				toGoalAmount: number().nullish(),
				toGoalName: string().nullish(),
			})
			.array(),
	}),

	fetchBoardGoalId: number(),

	fetchTotalBalance: balanceValidator,

	createItem: object({
		id: number(),
		name: string(),
	}),
};
