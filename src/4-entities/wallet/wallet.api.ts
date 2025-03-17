import {type ApiProps, responseValidator} from './wallet.types.ts';

export class WalletApi {
	static async fetchItems(props: ApiProps['fetchItems']) {
		// const {
		// 	params: {portfolioId},
		// 	payload,
		// } = props;

		const {} = props;

		const response = Promise.resolve({
			info: {
				hasNext: false,
				pageNumber: 0,
				pageSize: 10,
			},
			items: [
				{name: 'Phantom мемасы', description: '0x812731...12L1bb2sk'},
				{name: 'Metamask долгосрок ETH', description: '0x8193921...2348H6lsk'},
				{name: 'Краткосрок флиппинг', description: '0x7613921...2Lq8H6lsk'},
			],
		});

		return responseValidator.fetchItems.parse(response);

		// try {
		// 	const response = await HttpClient.get({
		// 		url: `portfolios/${portfolioId}/wallets`,
		// 		data: payload,
		// 	});
		//
		// 	return responseValidator.fetchItems.parse(response);
		// } catch (error) {
		// 	console.error(error);
		// 	return null;
		// }
	}
}
