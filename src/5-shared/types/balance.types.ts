import {nativeEnum, number, object} from 'zod';
import {CURRENCY} from '@shared/constants';

export type Balance = {
	amount: number;
	currency: CURRENCY;
} | null;

export const balanceValidator = object({
	amount: number(),
	currency: nativeEnum(CURRENCY),
});
