import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getSettingsConfigs} from '../config/AppLayout.config.tsx';
import {AuthModel} from '@entities/auth';
import {
	Button,
	ConfirmationPopup,
	getSelectTitle,
	Icon,
	Item,
	LeftPopup,
	List,
	Popup,
	PopupHelpers,
	Profit,
	SelectTabs,
	SelectTitle,
	StatusPopup,
	usePopupState,
} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';
import {APP_PATH, APP_TEXT, PERIOD_OPTIONS} from '@shared/constants';

export function AppHeader() {
	const location = useLocation();

	const [period, setPeriod] = useState(PERIOD_OPTIONS[0].value);
	const [selectedPortfolioValue, setSelectedPortfolioValue] = useState(portfolioOptions[0].value);
	const [isSuccess, setIsSuccess] = useState(false);

	const {logout} = AuthModel.useLogout();
	const {authUser} = AuthModel.useAuthUser();

	const {popupProps: userPopupProps, openPopup: openUserPopup} = usePopupState();
	const {popupProps: confirmationPopupProps, openPopup: openConfirmationPopup} = usePopupState();
	const {
		popupProps: portfolioPopupProps,
		openPopup: openPortfolioPopup,
		closePopup: closePortfolioPopup,
	} = usePopupState();
	const {
		popupProps: portfolioSettingsPopupProps,
		openPopup: openPortfolioSettingsPopup,
		closePopup: closePortfolioSettingsPopup,
	} = usePopupState();

	const {isDesktop} = useResponsive();

	return (
		<header role='app-header' className='flex items-center justify-between p-4'>
			<Button
				type='icon'
				icon={<Icon type='user' withBackground className='size-10' />}
				onClick={openUserPopup}
				className={cn(
					'p-0 transition duration-200 hover:bg-inherit active:brightness-90',
					isDesktop && 'hover:brightness-95',
				)}
			/>

			{location.pathname === APP_PATH.portfolio.list && (
				<>
					<SelectTitle
						type='title'
						value={selectedPortfolioValue}
						options={portfolioOptions}
						onClick={openPortfolioPopup}
						isPopupOpen={portfolioPopupProps.isOpen}
					/>

					<Button
						className='size-10'
						type='icon'
						icon={
							<Icon
								type='settings'
								className={cn(
									'text-xl',
									portfolioSettingsPopupProps.isOpen && 'text-primary-grey transition duration-200',
								)}
							/>
						}
						onClick={openPortfolioSettingsPopup}
					/>
				</>
			)}

			<UserSettingsPopup {...{userPopupProps, authUser, logout}} />

			<PortfolioSelectPopup
				{...{
					selectedPortfolioValue,
					setSelectedPortfolioValue,
					portfolioPopupProps,
					closePortfolioPopup,
					period,
					setPeriod,
				}}
			/>

			<Popup {...portfolioSettingsPopupProps} title={APP_TEXT.portfolioSettings}>
				{getSettingsConfigs(openConfirmationPopup).map((settingsConfig, index) => (
					<List
						key={index}
						items={settingsConfig}
						renderItem={(settingConfig) => (
							<Item
								{...settingConfig}
								onClick={
									settingConfig.onClick
										? ({navigate}) => {
												closePortfolioSettingsPopup();
												PopupHelpers.runAfterPopupClosed(() => settingConfig.onClick!({navigate}));
										  }
										: undefined
								}
							/>
						)}
					/>
				))}
			</Popup>

			<ConfirmationPopup
				{...confirmationPopupProps}
				title={getSelectTitle(selectedPortfolioValue, portfolioOptions)}
				description={APP_TEXT.confirmation.deletePortfolio}
				isActionPending={false}
				onActionClick={() => {
					setIsSuccess(true);
					//change portfolio-selector to total portfolio, when all portfolios are deleted
				}}
			/>

			<StatusPopup isSuccess={isSuccess} isError={false} statusTextKey='deletePortfolio' />
		</header>
	);
}

const portfolioOptions = [
	{
		name: 'Portfolio 1',
		description: '10 assets',
		rightName: '9 990 $',
		rightDescription: <Profit />,
		image: <Icon type='portfolio' withBackground />,
		value: 1,
	},
	{
		name: 'Portfolio 2',
		description: '12 assets',
		rightName: '8 865 $',
		rightDescription: <Profit />,
		image: <Icon type='portfolio' withBackground />,
		value: 2,
	},
	{
		name: 'Portfolio 3',
		description: '11 assets',
		rightName: '6 798 $',
		rightDescription: <Profit />,
		image: <Icon type='portfolio' withBackground />,
		value: 3,
	},
];

export function UserSettingsPopup(props: any) {
	const {userPopupProps, authUser, logout} = props;

	// const [isCopied, setIsCopied] = useState(false);

	return (
		<LeftPopup {...userPopupProps}>
			<div className='mb-2 flex flex-col items-center gap-2'>
				<div className='flex size-14 items-center justify-center rounded-full bg-secondary-violet text-primary-violet'>
					<Icon type='user' className='size-5' />
				</div>
				<div className='text-2xl font-medium'>{authUser?.email === 'toxa' ? 'Anton Maksimow' : authUser?.email}</div>
				{/*<div className='flex items-center gap-1.5'>*/}
				{/*	<div className='text-sm text-primary-grey'>@usernickname</div>*/}
				{/*	<div onClick={() => setIsCopied(true)}>*/}
				{/*		<Icon type={isCopied ? 'check' : 'copy'} className='size-[14px] text-primary-grey' />*/}
				{/*	</div>*/}
				{/*</div>*/}
			</div>

			<Item
				image={<Icon type='createGoal' className='size-5' />}
				name={'Subscription'}
				description={'Kрипто-карась'}
				// rightName={<div className='font-light text-primary-grey'>Крипто-карась</div>}
				rightName={
					<Button type='secondary' onClick={() => {}}>
						Upgrade
					</Button>
				}
				isSingle
			/>

			<div className='rounded-2xl bg-white'>
				<Item
					image={<Icon type='language' className='size-5' />}
					name={'Language'}
					rightName={<div className='font-light text-primary-grey'>English</div>}
					onClick={() => {}}
				/>
				<Item
					image={<Icon type='theme' className='-mr-1' />}
					name={'Theme'}
					rightName={<div className='font-light text-primary-grey'>Light</div>}
					onClick={() => {}}
				/>
			</div>

			<div className='rounded-2xl bg-white'>
				<Item image={<Icon type='contactUs' className='size-5' />} name={'Contact us'} onClick={() => {}} />
				<Item
					image={<Icon type='logout' className='size-5 text-red-600' />}
					name={APP_TEXT.logOut}
					className='text-red-600'
					onClick={() => logout()}
					isSingle
				/>
			</div>
		</LeftPopup>
	);
}

export function PortfolioSelectPopup(props: any) {
	const {
		portfolioPopupProps,
		selectedPortfolioValue,
		setSelectedPortfolioValue,
		closePortfolioPopup,
		period,
		setPeriod,
	} = props;

	const navigate = useNavigate();

	return (
		<Popup
			{...portfolioPopupProps}
			title={APP_TEXT.portfolios}
			rightTitle={
				<Button
					type='icon'
					icon={<Icon type='plus' />}
					onClick={() => {
						closePortfolioPopup();
						PopupHelpers.runAfterPopupClosed(() => navigate(APP_PATH.portfolio.create));
					}}
				/>
			}
		>
			<SelectTabs value={period} onChange={setPeriod} options={PERIOD_OPTIONS} />

			<Item
				image={<Icon type='portfolio' withBackground />}
				name={APP_TEXT.totalPortfolio}
				description='35 assets'
				rightName='25 653$'
				rightDescription={<Profit />}
			/>

			<List
				items={portfolioOptions}
				renderItem={({value, ...restPortfolioOption}) => {
					return (
						<Item
							{...restPortfolioOption}
							onClick={() => {
								closePortfolioPopup();
								PopupHelpers.runAfterPopupClosed(() => setSelectedPortfolioValue(value));
							}}
							isChecked={value === selectedPortfolioValue}
						/>
					);
				}}
			/>
		</Popup>
	);
}
