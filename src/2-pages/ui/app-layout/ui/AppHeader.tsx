import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {settingsConfigs} from '../config/AppLayout.config.tsx';
import {AuthModel} from '@entities/auth';
import {Button, Icon, Item, LeftPopup, List, Popup, PopupHelpers, Profit, SelectField, usePopupState} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';
import {APP_PATH, APP_TEXT, PERIOD_OPTIONS} from '@shared/constants';

export function AppHeader() {
	const location = useLocation();

	const [period, setPeriod] = useState(PERIOD_OPTIONS[0].value);
	const [selectedPortfolioValue, setSelectedPortfolioValue] = useState(portfolioOptions[0].value);

	const {logout} = AuthModel.useLogout();
	const {authUser} = AuthModel.useAuthUser();

	const {popupProps: userPopupProps, openPopup: openUserPopup} = usePopupState();
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
			<Button type='circle' onClick={openUserPopup} icon={<Icon type='user' />} className='size-10' />

			{location.pathname === APP_PATH.portfolio.list && (
				<>
					<div
						className={cn(
							'flex cursor-pointer items-center gap-2 text-xl font-medium transition duration-200 active:text-primary-grey',
							portfolioPopupProps.isOpen && 'text-primary-grey',
							isDesktop && 'hover:text-primary-grey',
						)}
						onClick={openPortfolioPopup}
					>
						<div>{portfolioOptions.find((option) => option.value === selectedPortfolioValue)?.name}</div>
						<Icon type='chevronDown' className='size-3 flex-shrink-0' />
					</div>

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

			<Popup {...portfolioSettingsPopupProps} title='Portfolio 1'>
				{settingsConfigs.map((settingsConfig, index) => (
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
			title={'Portfolios'}
			rightTitle={
				<SelectField value={period} onChange={setPeriod} options={PERIOD_OPTIONS} popupTitle={APP_TEXT.period} />
			}
		>
			<Item
				image={<Icon type='portfolio' withBackground />}
				name='Total portfolio'
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
							isChecked={value === selectedPortfolioValue}
							onClick={() => {
								closePortfolioPopup();
								PopupHelpers.runAfterPopupClosed(() => setSelectedPortfolioValue(value));
							}}
						/>
					);
				}}
			/>

			<Button
				type='secondary'
				onClick={() => {
					closePortfolioPopup();
					PopupHelpers.runAfterPopupClosed(() => navigate(APP_PATH.portfolio.create));
				}}
				className='w-full py-3 text-base'
			>
				{APP_TEXT.createPortfolio}
			</Button>
		</Popup>
	);
}
