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
	popupHelper,
	Profit,
	SelectTabsField,
	SelectTitle,
	StatusPopup,
	usePopupState,
} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';
import {APP_PATH, APP_TEXT, PERIOD_OPTIONS} from '@shared/constants';
import {DefaultSelectOption} from '@shared/ui/fields/select-field/types/SelectField.types.ts';

export function AppHeader() {
	const location = useLocation();

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

	const [period, setPeriod] = useState(PERIOD_OPTIONS[0].value);
	const [selectedPortfolioValue, setSelectedPortfolioValue] = useState(portfolioOptions[0].value);
	const [isSuccess, setIsSuccess] = useState(false);

	const {logout} = AuthModel.useLogout();
	const {authUser} = AuthModel.useAuthUser();

	const {popupProps: userPopupProps, openPopup: openUserPopup} = usePopupState();
	const {
		popupProps: confirmationPopupProps,
		openPopup: openConfirmationPopup,
		closePopup: closeConfirmationPopup,
	} = usePopupState();
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
					'transition duration-200 hover:bg-inherit active:brightness-90',
					isDesktop && 'hover:brightness-95 active:bg-inherit',
				)}
			/>

			{location.pathname !== APP_PATH.goal.list && (
				<>
					<SelectTitle
						type='title'
						value={selectedPortfolioValue}
						options={portfolioOptions}
						onClick={openPortfolioPopup}
						isPopupOpen={portfolioPopupProps.isOpen}
					/>

					<Button
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
						className='size-10'
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
					options: portfolioOptions,
				}}
			/>

			<Popup {...portfolioSettingsPopupProps}>
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
												popupHelper.runAfterPopupClosed(() => settingConfig.onClick!({navigate}));
										  }
										: undefined
								}
								isMenuItem
							/>
						)}
					/>
				))}
			</Popup>

			<ConfirmationPopup
				{...confirmationPopupProps}
				close={closeConfirmationPopup}
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
				{/*		<Icon types={isCopied ? 'check' : 'copy'} className='size-[14px] text-primary-grey' />*/}
				{/*	</div>*/}
				{/*</div>*/}
			</div>

			<Item
				image={<Icon type='createGoal' />}
				name={'Subscription'}
				description={'Kрипто-карась'}
				// rightName={<div className='font-light text-primary-grey'>Крипто-карась</div>}
				rightNode={
					<Button type='secondary' onClick={() => {}}>
						Upgrade
					</Button>
				}
				isSingle
				isMenuItem
			/>

			<div className='rounded-2xl bg-white'>
				<Item image={<Icon type='language' />} name={'Language'} rightName={'English'} onClick={() => {}} isMenuItem />
				<Item
					image={<Icon type='theme' className='-mr-1' />}
					name={'Theme'}
					rightName={'Light'}
					onClick={() => {}}
					isMenuItem
				/>
			</div>

			<div className='rounded-2xl bg-white'>
				<Item image={<Icon type='contactUs' />} name={'Contact us'} onClick={() => {}} isMenuItem />
				<Item image={<Icon type='logout' />} name={APP_TEXT.logOut} onClick={() => logout()} isDestructiveMenuItem />
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
		options,
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
						popupHelper.runAfterPopupClosed(() => navigate(APP_PATH.portfolio.create));
					}}
				/>
			}
		>
			<SelectTabsField value={period} onChange={setPeriod} options={PERIOD_OPTIONS} />

			<Item
				image={<Icon type='portfolio' withBackground />}
				name={APP_TEXT.totalPortfolio}
				description='35 assets'
				rightName='25 653$'
				rightDescription={<Profit />}
				isSingle
			/>

			{options.length ? (
				<List
					items={options as DefaultSelectOption<number>[]}
					renderItem={({value, ...restPortfolioOption}) => {
						return (
							<Item
								{...restPortfolioOption}
								onClick={() => {
									closePortfolioPopup();
									popupHelper.runAfterPopupClosed(() => setSelectedPortfolioValue(value));
								}}
								isChecked={value === selectedPortfolioValue}
							/>
						);
					}}
				/>
			) : (
				<Item
					image={<Icon type='portfolio' withBackground />}
					imageIcon={<Icon type='plus' />}
					name={APP_TEXT.createPortfolio}
					onClick={({navigate}) => navigate(APP_PATH.portfolio.create)}
					isSingle
				/>
			)}
		</Popup>
	);
}
