import {CURRENCY_SYMBOL} from '@shared/constants';
import {TextHelpers} from '@shared/lib';
import {Balance} from '@shared/types';

export function TotalBalance({totalBalance}: {totalBalance: Balance}) {
	if (!totalBalance) return null;

	const [int, float] = TextHelpers.getAmount(totalBalance.amount).split('.');

	return (
		<div>
			<span className='text-3xl font-[600]'>
				<span>{int}</span>
				{!float && <span> {CURRENCY_SYMBOL[totalBalance.currency]}</span>}
			</span>
			{float && (
				<span className='text-xl font-bold'>
					.{float} {CURRENCY_SYMBOL[totalBalance.currency]}
				</span>
			)}
		</div>
	);
}
