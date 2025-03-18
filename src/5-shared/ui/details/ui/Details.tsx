import {Card, LoadingWrapper} from '@shared/ui';
import {DetailsProps} from '../types/Details.types.ts';
import {getDetailsValue} from '../helpers/Details.helpers.ts';
import {get} from '@shared/lib';

export function Details<T>({details, detailsFields, isLoading}: DetailsProps<T>) {
	return (
		<Card>
			{detailsFields.map(({label, key, ...restDetailsField}, index) => (
				<div className='flex justify-between p-4 text-sm' key={index}>
					<LoadingWrapper isLoading={isLoading} isTextSm>
						<div className='font-medium text-primary-grey'>{label}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isLoading} isTextSm>
						{getDetailsValue(get(details, key), restDetailsField)}
					</LoadingWrapper>
				</div>
			))}
		</Card>
	);
}
