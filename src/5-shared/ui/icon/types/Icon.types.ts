import {ICON_MAP} from '../config/Icon.config.tsx';

export type IconType = keyof typeof ICON_MAP;

export type IconProps = {
	type: IconType;
	className?: string;
	onClick?: () => void;
	withBackground?: boolean;
};
