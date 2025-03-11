import type {Payload} from '@shared/api';
import {boolean, number, object, string} from 'zod';
import {balanceValidator} from '@shared/types';

export type Props = {
	useItems: {
		filter?: Payload;
	};
};

export type ApiProps = {
	fetchItems: {
		params: {portfolioId: number};
		payload: Props['useItems']['filter'];
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
};
