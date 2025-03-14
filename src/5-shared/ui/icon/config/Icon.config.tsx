import {Search, TrendingUp} from 'lucide-react';
import {
	FaArrowDown,
	FaArrowLeft,
	FaArrowRight,
	FaArrowUp,
	FaBriefcase,
	FaCalendar,
	FaCheck,
	FaChevronDown,
	FaChevronLeft,
	FaChevronRight,
	FaDollarSign,
	FaEarthAmericas,
	FaInfo,
	FaPen,
	FaPlus,
	FaRegCopy,
	FaShare,
	FaStar,
	FaTrash,
	FaUser,
	FaWallet,
	FaXmark,
} from 'react-icons/fa6';
import {FaCamera, FaEye, FaEyeSlash, FaSignOutAlt} from 'react-icons/fa';
import {cn} from '@shared/lib';
import {BsFillQuestionCircleFill, BsThreeDotsVertical} from 'react-icons/bs';
import {AiFillDollarCircle} from 'react-icons/ai';
import {IoIosColorPalette} from 'react-icons/io';
import {HiMiniMegaphone} from 'react-icons/hi2';

export const ICON_MAP = {
	user: FaUser,
	logout: FaSignOutAlt,

	show: FaEye,
	hide: FaEyeSlash,

	createGoal: FaStar,
	fund: FaPlus,
	withdraw: FaArrowDown,
	transfer: ({className}: {className: string}) => <FaArrowUp className={cn('rotate-45 transform', className)} />,

	transferTo: FaArrowDown,

	success: FaCheck,
	error: FaXmark,

	backButton: FaArrowLeft,

	uploadImage: FaCamera,

	edit: FaPen,

	depositTransaction: FaArrowLeft,
	withdrawTransaction: FaArrowRight,
	transferTransaction: ({className}: {className: string}) => (
		<FaArrowUp className={cn('rotate-45 transform', className)} />
	),

	congratulations: ({className}: {className: string}) => <div className={className}>🎉</div>,

	selectChevron: FaChevronDown,

	plus: FaPlus,
	x: FaXmark,
	check: FaCheck,
	calendar: FaCalendar,
	search: Search,
	chevronLeft: FaChevronLeft,
	chevronRight: FaChevronRight,
	info: FaInfo,
	settings: BsThreeDotsVertical,
	dollar: FaDollarSign,
	wallet: FaWallet,
	share: FaShare,
	delete: FaTrash,
	portfolio: FaBriefcase,

	copy: FaRegCopy,

	trendUp: TrendingUp,

	currency: CurrencyIcon,
	theme: ThemeIcon,
	language: FaEarthAmericas,
	support: BsFillQuestionCircleFill,
	feedback: FeedbackIcon,
} as const;

export type IconType = keyof typeof ICON_MAP;

function ThemeIcon() {
	// Подбираем коэффициент масштабирования, чтобы визуальный размер совпадал с LanguageIcon
	const scale = 1.7; // настроить по необходимости
	return (
		<span
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: 24,
				height: 24,
				overflow: 'hidden',
				margin: '0 -2px',
			}}
		>
			<IoIosColorPalette
				style={{
					transform: `scale(${scale})`,
					transformOrigin: 'center',
				}}
			/>
		</span>
	);
}

function CurrencyIcon() {
	// Подбираем коэффициент масштабирования, чтобы визуальный размер совпадал с LanguageIcon
	const scale = 1.43; // настроить по необходимости
	return (
		<span
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: 24,
				height: 24,
				overflow: 'hidden',
				margin: '0 -2px',
			}}
		>
			<AiFillDollarCircle
				style={{
					transform: `scale(${scale})`,
					transformOrigin: 'center',
				}}
			/>
		</span>
	);
}

function FeedbackIcon() {
	// Подбираем коэффициент масштабирования, чтобы визуальный размер совпадал с LanguageIcon
	const scale = 1.43; // настроить по необходимости
	return (
		<span
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: 24,
				height: 24,
				overflow: 'hidden',
				margin: '0 -2px',
			}}
		>
			<HiMiniMegaphone
				style={{
					transform: `scale(${scale})`,
					transformOrigin: 'center',
				}}
			/>
		</span>
	);
}
