import {Button, type ButtonProps, Icon} from '@shared/ui';

export function CardButtonTitle({onClick}: {onClick: ButtonProps['onClick']}) {
	return (
		<Button
			type='icon'
			onClick={onClick}
			className='-m-[3px] p-[3px]'
			icon={<Icon type='plus' className='size-3.5 text-primary-grey' />}
		/>
	);
}
