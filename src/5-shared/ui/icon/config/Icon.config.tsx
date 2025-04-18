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
import {BsFillQuestionCircleFill, BsThreeDots, BsTriangleFill} from 'react-icons/bs';
import {AiFillDollarCircle} from 'react-icons/ai';
import {IoIosColorPalette} from 'react-icons/io';
import {HiMiniMegaphone} from 'react-icons/hi2';

export const ICON_MAP = {
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

	profitUp: BsTriangleFill,
	profitDown: ({className}: {className: string}) => (
		<div className={cn('rotate-180 transform')}>
			<BsTriangleFill className={className} />
		</div>
	),

	user: FaUser,
	logout: FaSignOutAlt,
	show: FaEye,
	hide: FaEyeSlash,
	plus: FaPlus,
	x: FaXmark,
	check: FaCheck,
	calendar: FaCalendar,
	search: Search,
	chevronDown: FaChevronDown,
	chevronLeft: FaChevronLeft,
	chevronRight: FaChevronRight,
	info: FaInfo,
	settings: BsThreeDots,
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
	contactUs: ContactUsIcon,
	arrowUp: FaArrowUp,
	arrowDown: FaArrowDown,
} as const;

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

function ContactUsIcon() {
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
