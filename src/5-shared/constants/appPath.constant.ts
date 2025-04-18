export const APP_PATH = {
	root: '/',
	home: '/portfolio-assets',
	pageNotFound: '/page-not-found',
	login: '/log-in',
	signup: '/sign-up',

	goal: {
		list: '/goal-list',
		fund: '/goal-fund',
		withdraw: '/goal-withdraw',
		transfer: '/goal-transfer',
		create: '/goal-create',
		details: '/goal-details',

		getItemDetailsPath: (id: any) => `${APP_PATH.goal.details}/${id}`,
		getItemTransactionsPath: (id: any) => `${APP_PATH.goal.details}/${id}/transactions`,
		getItemDetailsFundPath: (id: any) => `${APP_PATH.goal.details}/${id}/fund`,
		getItemDetailsWithdrawPath: (id: any) => `${APP_PATH.goal.details}/${id}/withdraw`,
		getItemDetailsTransferPath: (id: any) => `${APP_PATH.goal.details}/${id}/transfer`,
		getItemEditPath: (id: any) => `${APP_PATH.goal.details}/${id}/edit`,
	},

	portfolio: {
		// assets: '/portfolio/portfolio-id/assets',
		assets: '/portfolio-assets',
		create: '/portfolio-create',
		details: '/portfolio',
		transactions: '/portfolio-transactions',
		wallets: '/portfolio-wallets',
		connectWallet: '/portfolio-connect-wallet',

		getItemEditPath: (id: any) => `${APP_PATH.portfolio.details}/${id}/edit`,

		getWalletDetailsPath: (id: any) => `${APP_PATH.portfolio.wallets}/${id}`,
		getWalletEditPath: (id: any) => `${APP_PATH.portfolio.wallets}/${id}/edit`,
	},

	// wallet: {
	// list: '/wallets',
	// getItemDetailsPath: (id: any) => `${APP_PATH.wallet.list}/${id}`,
	// getItemEditPath: (id: any) => `${APP_PATH.wallet.list}/${id}/edit`,
	// },
};
