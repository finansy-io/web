import {useState} from 'react';
import {PageActionButtonWrapper, PageWidgetsWrapper} from '@pages/ui';
import {Button, Header, Spinner, StatusPopup, TextField} from '@shared/ui';
import {APP_PATH, APP_TEXT, FORM} from '@shared/constants';

/**
 * Фронтовая логика валидации: 1 get запрос на лист с фильтром name={name}
 * */

export function PortfolioWalletConnectPage() {
	const [activeStepIndex, setActiveStepIndex] = useState(0);

	const [name, setName] = useState('');
	const [address, setAddress] = useState('');

	const [isConnectWalletSuccess, setIsConnectWalletSuccess] = useState(false);
	const [isConnectWalletError] = useState(false);

	const isConnectWalletPending = false;

	const isNameValidationPending = false;
	const isNameValidationSuccess = false;
	const isNameValidationError = false;

	const isAddressValidationPending = false;
	const isAddressValidationSuccess = false;
	const isAddressValidationError = false;

	return (
		<>
			<Header
				title={activeStepIndex === 0 ? APP_TEXT.enterWalletName : APP_TEXT.enterWalletAddress}
				subDescription={activeStepIndex === 1 && APP_TEXT.connectWalletDisclaimer}
				backPath={APP_PATH.portfolio.assets}
				stepsCount={2}
				activeStepIndex={activeStepIndex}
				handleBackButtonClick={activeStepIndex === 0 ? undefined : () => setActiveStepIndex(activeStepIndex - 1)}
			/>

			{activeStepIndex === 0 && (
				<PageWidgetsWrapper>
					<TextField
						value={name}
						onChange={setName}
						description={
							<>
								{isNameValidationPending && (
									<div className='flex items-center gap-1'>
										<div className='text-primary-grey'>
											<Spinner className='size-3 text-primary-grey' />
										</div>
										<div>Checking name</div>
									</div>
								)}
								{isNameValidationSuccess && <div className='text-primary-violet'>Name is available</div>}
							</>
						}
						errorText={isNameValidationError && 'Such name already exists'}
						maxLength={FORM.nameMaxLength}
						placeholder={APP_TEXT.walletName}
						hints={['Phantom memes', 'Metamask memes', 'Long term altcoins', 'Cold wallet', 'Flipping']}
					/>
				</PageWidgetsWrapper>
			)}

			{activeStepIndex === 1 && (
				<PageWidgetsWrapper>
					<TextField
						value={address}
						onChange={setAddress}
						description={
							<>
								<div>Supported networks: Ethereum, Solana</div>
								{isAddressValidationPending && (
									<div className='flex items-center gap-1'>
										<div className='text-primary-grey'>
											<Spinner className='size-3 text-primary-grey' />
										</div>
										<div>Checking address</div>
									</div>
								)}
								{isAddressValidationSuccess && <div className='text-primary-violet'>Address is available</div>}
							</>
						}
						errorText={isAddressValidationError && (true ? 'Network is unsupported' : 'Such address already connected')}
						placeholder={APP_TEXT.walletAddress}
					/>
				</PageWidgetsWrapper>
			)}

			<PageActionButtonWrapper>
				<Button
					type='primary'
					onClick={
						activeStepIndex === 0
							? () => setActiveStepIndex(activeStepIndex + 1)
							: () => setIsConnectWalletSuccess(true)
					}
					disabled={
						(activeStepIndex === 0 && (!name || isNameValidationPending || isNameValidationError)) ||
						(activeStepIndex === 1 && (!address || isAddressValidationPending || isAddressValidationError))
					}
					isPending={isConnectWalletPending}
				>
					{activeStepIndex === 0 ? APP_TEXT.continue : APP_TEXT.connect}
				</Button>
			</PageActionButtonWrapper>

			<StatusPopup
				isSuccess={isConnectWalletSuccess}
				isError={isConnectWalletError}
				statusTextKey='connectWallet'
				statusTextProps={{name}}
				onDismiss={(navigate) => navigate(APP_PATH.portfolio.assets)}
			/>
		</>
	);
}
