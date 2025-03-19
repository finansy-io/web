import {useLocation, useNavigate} from 'react-router-dom';
import {portfolioConfigs, settingsConfigs} from '../config/AppLayout.config.tsx';
import {AuthModel} from '@entities/auth';
import {Button, Card, Icon, Item, List, Popup, PopupHelpers, usePopupState} from '@shared/ui';
import {Drawer} from '@shared/ui/popup/ui/Drawer.tsx';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {cn, useResponsive} from '@shared/lib';

export function AppHeader() {
	const location = useLocation();
	const navigate = useNavigate();

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

	// const [dataFilter, setDataFilter] = useState('24h');

	const {isDesktop} = useResponsive();

	// const [isCopied, setIsCopied] = useState(false);

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
						<div>Portfolio 1</div>
						<Icon type='selectChevron' className='size-3 flex-shrink-0' />
					</div>

					<div className='flex size-10 items-center justify-center'>
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
						/>
					</div>
				</>
			)}

			<Drawer {...userPopupProps} direction='left'>
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
			</Drawer>

			<Popup
				{...portfolioPopupProps}
				leftTitle={
					<div className='flex items-center gap-1 text-sm font-normal'>
						<div>24h</div>
						<div>
							<Icon type='selectChevron' className='size-2.5' />
						</div>
					</div>
				}
				title={'Portfolios'}
				rightTitle={
					<div
						className='-m-1 flex items-center gap-3 p-1'
						onClick={() => {
							closePortfolioPopup();
							PopupHelpers.runAfterPopupClosed(() => navigate(APP_PATH.portfolio.create));
						}}
					>
						<Icon type='plus' className='size-4' />
					</div>
				}
			>
				<Item
					image={<Icon type='portfolio' withBackground />}
					name='Total portfolio'
					description='35 assets'
					rightName='25 653$'
					rightDescription={
						<div className='flex items-center gap-1.5 text-red-600'>
							<div>-765$</div>
							<div className='size-0.5 rounded-full bg-red-600' />
							<div>32.21%</div>
						</div>
					}
				/>

				<Card>
					<List
						items={portfolioConfigs}
						renderItem={(portfolioConfig) => {
							const checked = portfolioConfig.name === 'Portfolio 1';
							return (
								<Item
									{...portfolioConfig}
									imageIcon={checked && <Icon type='check' />}
									className={checked && 'bg-light-grey'}
								/>
							);
						}}
					/>
				</Card>
			</Popup>

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
