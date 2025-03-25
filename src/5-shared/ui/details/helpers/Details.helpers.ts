import {RestDetailsField} from '../types/Details.types.ts';
import {APP_TEXT} from '@shared/constants';

export function getDetailsValue(value: string | number, detailsField: RestDetailsField) {
	const {type, customNode, fallbackValue: fallbackValueFromField} = detailsField;

	const fallbackValue = fallbackValueFromField ?? APP_TEXT.noData;

	if (type === 'custom' && customNode) {
		return customNode(value) || fallbackValue;
	}

	return value || fallbackValue;
}
