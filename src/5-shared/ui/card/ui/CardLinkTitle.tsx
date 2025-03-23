import {useNavigate} from 'react-router-dom';
import {type CardLinkTitleProps} from '../types/CardLinkTitle.types';
import {Icon} from '@shared/ui';

export function CardLinkTitle(props: CardLinkTitleProps) {
	const {title, path} = props;

	const navigate = useNavigate();

	return (
		<div className='-m-[3px] flex w-fit cursor-pointer items-center gap-1 p-[3px]' onClick={() => navigate(path)}>
			<div>{title}</div>
			<div>
				<Icon type='chevronRight' className='size-2.5 text-primary-grey' />
			</div>
		</div>
	);
}
