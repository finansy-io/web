import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PageActionButtonWrapper, PageWidgetsWrapper} from '@pages/ui';
import {portfolioNameMaxLength} from '@widgets/portfolio';
import {
	Button,
	Header,
	Popup,
	PopupHelpers,
	Spinner,
	StatusPopup,
	TextField,
	TextFieldHints,
	usePopupState,
} from '@shared/ui';
import {cn} from '@shared/lib';
import {APP_PATH, APP_TEXT} from '@shared/constants';

const emojiConfigs = [
	{value: '🦄'},
	{value: '🕊'},
	{value: '🐳'},
	{value: '🐹'},
	{value: '🐶'},
	{value: '🦊'},
	{value: '🐯'},
	{value: '🐸'},
	{value: '🦋'},
	{value: '🏎'},
	{value: '🐽'},
	{value: '😎'},
	{value: '✊🏼'},
	{value: '💅'},
	{value: '🌸'},
	{value: '☀️'},
	{value: '⛔️'},
	{value: '😈'},
	{value: '💀'},
	{value: '🧠'},
	{value: '🎉'},
].map((config, index) => ({
	...config,
	id: index,
}));

export function PortfolioCreatePage() {
	const navigate = useNavigate();

	const [name, setName] = useState('');

	const [selectedEmojiConfig, setSelectedEmojiConfig] = useState(emojiConfigs[0]);

	const [isCreatePortfolioSuccess, setIsCreatePortfolioSuccess] = useState(false);

	const isNameValidationPending = false;
	const isNameValidationSuccess = false;
	const isNameValidationError = false;

	const isCreatePortfolioPending = false;
	const isCreatePortfolioError = false;

	return (
		<>
			<Header title={APP_TEXT.createPortfolio} backPath={APP_PATH.portfolio.list} />

			<PageWidgetsWrapper>
				<EmojiField {...{selectedEmojiConfig, setSelectedEmojiConfig}} />

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
					maxLength={portfolioNameMaxLength}
					placeholder={APP_TEXT.portfolioName}
				/>

				<TextFieldHints
					visible={!name}
					hints={['Memecoins', 'Altcoins', 'AI agents', 'Long term', 'Flipping']}
					setTextFieldValue={setName}
				/>
			</PageWidgetsWrapper>

			<PageActionButtonWrapper>
				<Button
					type='primary'
					onClick={() => {
						setIsCreatePortfolioSuccess(true);
						PopupHelpers.runAfterStatusPopupClosed(() => navigate(APP_PATH.portfolio.list));
					}}
					disabled={!name || isNameValidationPending || isNameValidationError}
					isPending={isCreatePortfolioPending}
				>
					{APP_TEXT.create}
				</Button>
			</PageActionButtonWrapper>

			<StatusPopup
				isSuccess={isCreatePortfolioSuccess}
				isError={isCreatePortfolioError}
				statusTextKey='createPortfolio'
			/>
		</>
	);
}

type EmojiConfig = {
	value: any;
	id: number;
};
type EmojiFieldProps = {
	selectedEmojiConfig: EmojiConfig;
	setSelectedEmojiConfig: (value: EmojiConfig) => void;
};

export function EmojiField({selectedEmojiConfig, setSelectedEmojiConfig}: EmojiFieldProps) {
	const [inPopupEmojiConfig, setInPopupEmojiConfig] = useState(selectedEmojiConfig);

	const {popupProps, openPopup, closePopup} = usePopupState();

	useEffect(() => {
		if (inPopupEmojiConfig.id === selectedEmojiConfig.id) return;
		setInPopupEmojiConfig(selectedEmojiConfig);
	}, [selectedEmojiConfig]);

	return (
		<>
			<div
				className='flex cursor-pointer flex-col items-center gap-1 self-center transition duration-200 active:scale-95 active:brightness-95'
				onClick={openPopup}
			>
				<div className='relative flex size-20 items-center justify-center rounded-full bg-secondary-violet text-2xl'>
					<span>{selectedEmojiConfig.value}</span>
				</div>
				<div className='text-sm text-primary-violet'>{APP_TEXT.setEmoji}</div>
			</div>

			<Popup {...popupProps} title={APP_TEXT.portfolioImage}>
				<div className='flex size-20 items-center justify-center self-center rounded-full bg-secondary-violet text-2xl'>
					{inPopupEmojiConfig.value}
				</div>

				<div className='flex flex-wrap gap-2 text-xl'>
					{emojiConfigs.map((emojiConfig) => (
						<div
							key={emojiConfig.id}
							className={cn(
								'size-10 rounded-full p-1 text-center transition duration-200 active:scale-95 active:brightness-90',
								inPopupEmojiConfig.id === emojiConfig.id && 'bg-secondary-grey',
							)}
							onClick={() => setInPopupEmojiConfig(emojiConfig)}
						>
							{emojiConfig.value}
						</div>
					))}
				</div>

				<Button
					type='primary'
					onClick={() => {
						closePopup();
						PopupHelpers.runAfterPopupClosed(() => setSelectedEmojiConfig(inPopupEmojiConfig));
					}}
				>
					{APP_TEXT.save}
				</Button>
			</Popup>
		</>
	);
}
