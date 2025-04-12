import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {GoalApi} from './goal.api.ts';
import {type MutationProps, type Props} from './goal.types.ts';
import {AuthModel} from '@entities/auth';
import {TRANSACTION_TYPE} from '@shared/constants';
import {popupHelper} from '@shared/ui';
import {useState} from 'react';

export class GoalModel {
	static useItems(props: Props['useItems'] = {}) {
		const {filter, queryKey = ''} = props;

		const {boardGoalId, isBoardGoalIdLoading} = this.useBoardGoalId();

		// when is loading data undefined in BLL, but null in UI
		const {data, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery({
			queryKey: [`goal-item-list-${queryKey}`, filter],

			queryFn: ({pageParam}: {pageParam?: number}) => {
				return GoalApi.fetchItems({
					params: {boardGoalId: boardGoalId!},
					payload: {...filter, pageNumber: pageParam, pageSize: 10},
				});
			},

			initialPageParam: 0,

			getNextPageParam: (lastPage) => {
				return lastPage?.info.hasNext ? lastPage.info.pageNumber + 1 : undefined;
			},

			enabled: !!boardGoalId,
		});

		const filteredPages = data?.pages.filter((page) => page !== null);

		return {
			// Сливаем элементы всех страниц. В момент загрузки goals = null
			goals: filteredPages?.length
				? filteredPages.flatMap((page) => page && page.items.map((item) => ({...item, id: String(item.id)})))
				: null,
			isGoalsLoading: isLoading || isBoardGoalIdLoading,
			hasNextGoalsPage: hasNextPage,
			fetchNextGoalsPage: fetchNextPage,
		};
	}

	static useItemDetails(props: Props['useItemDetails']) {
		const {id} = props;

		const {boardGoalId, isBoardGoalIdLoading} = this.useBoardGoalId();

		const {data, isFetching} = useQuery({
			queryKey: [`goal-details-${id}`],

			queryFn: () => {
				return GoalApi.fetchItemDetails({
					params: {boardGoalId: boardGoalId!, id: id!},
				});
			},

			enabled: !!boardGoalId && !!id,
		});

		return {
			goalDetails: !data ? null : {...data, id: String(data.id)},
			isGoalDetailsLoading: isFetching || isBoardGoalIdLoading,
		};
	}

	static useItemTransactions(props: Props['useItemTransactions']) {
		const {id} = props;

		const {boardGoalId, isBoardGoalIdLoading} = this.useBoardGoalId();

		const {data, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery({
			queryKey: [`goal-transactions-${id}`],

			queryFn: ({pageParam}: {pageParam?: number}) => {
				return GoalApi.fetchItemTransactions({
					params: {boardGoalId: boardGoalId!, id},
					payload: {pageNumber: pageParam, pageSize: 10},
				});
			},

			initialPageParam: 0,

			getNextPageParam: (lastPage) => {
				return lastPage?.info.hasNext ? lastPage.info.pageNumber + 1 : undefined;
			},

			enabled: !!boardGoalId && !!id,
		});

		const filteredPages = data?.pages.filter((page) => page !== null);

		return {
			goalTransactions: filteredPages?.length ? filteredPages.flatMap((page) => page && page.items) : null,
			isGoalTransactionsLoading: isLoading || isBoardGoalIdLoading,
			hasNextGoalTransactionsPage: hasNextPage,
			fetchNextGoalTransactionsPage: fetchNextPage,
		};
	}

	static useTotalBalance() {
		const {boardGoalId, isBoardGoalIdLoading} = this.useBoardGoalId();

		const {data, isFetching} = useQuery({
			queryKey: ['goal-total-balance'],

			queryFn: () => GoalApi.fetchTotalBalance(boardGoalId!),

			enabled: !!boardGoalId,
		});

		return {
			goalTotalBalance: data ? data : null,
			isGoalTotalBalanceLoading: isFetching || isBoardGoalIdLoading,
		};
	}

	private static useBoardGoalId() {
		const {authUser, isAuthUserLoading} = AuthModel.useAuthUser();

		const {data, isFetching} = useQuery({
			queryKey: ['board-goal-id'],

			queryFn: () => GoalApi.fetchBoardGoalId(authUser!.id),

			enabled: !!authUser,
		});

		return {
			boardGoalId: data,
			isBoardGoalIdLoading: isFetching || isAuthUserLoading,
		};
	}

	static useCreateItem() {
		const {boardGoalId} = this.useBoardGoalId();

		const [createdGoalId, setCreatedGoalId] = useState<number | null>(null);

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-create'],

			mutationFn: (props: MutationProps['useCreateItem']) => {
				return GoalApi.createItem({
					params: {boardGoalId: boardGoalId!},
					payload: props.payload,
				});
			},

			onSuccess: (goal) => {
				if (!goal) {
					console.error('Goal data is missing');
					return;
				}

				setCreatedGoalId(goal.id);
			},
		});

		return {
			createGoal: mutate,
			isCreateGoalPending: isPending,
			isCreateGoalSuccess: isSuccess,
			isCreateGoalError: isError,
			createdGoalId,
		};
	}

	static useUpdateItem() {
		const {boardGoalId} = this.useBoardGoalId();

		const queryClient = useQueryClient();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['edit-goal'],

			mutationFn: (props: MutationProps['useUpdateItem']) => {
				return GoalApi.updateItem({
					params: {...props.params, boardGoalId: boardGoalId!},
					payload: props.payload,
				});
			},

			onSuccess: (data: any) => {
				popupHelper.runAfterStatusPopupClosed(() => {
					void queryClient.invalidateQueries({queryKey: [`goal-details-${data.id}`]});
				});
			},
		});

		return {
			updateGoal: mutate,
			isUpdateGoalPending: isPending,
			isUpdateGoalSuccess: isSuccess,
			isUpdateGoalError: isError,
		};
	}

	static useDeleteItem() {
		const queryClient = useQueryClient();

		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-delete'],

			mutationFn: (props: MutationProps['useDeleteItem']) => {
				return GoalApi.deleteItem({
					params: {...props.params, boardGoalId: boardGoalId!},
				});
			},

			onSuccess: () => {
				popupHelper.runAfterStatusPopupClosed(() => {
					void queryClient.invalidateQueries({queryKey: ['goal-items']});
				});
			},
		});

		return {
			deleteGoal: mutate,
			isDeleteGoalPending: isPending,
			isDeleteGoalSuccess: isSuccess,
			isDeleteGoalError: isError,
		};
	}

	static useFund() {
		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-deposit-money'],

			mutationFn: (props: MutationProps['useFund']) => {
				return GoalApi.fundItem({
					params: {...props.params, boardGoalId: boardGoalId!},
					payload: {...props.payload, type: TRANSACTION_TYPE.DEPOSIT},
				});
			},
		});

		return {
			fundGoal: mutate,
			isFundGoalPending: isPending,
			isFundGoalSuccess: isSuccess,
			isFundGoalError: isError,
		};
	}

	static useWithdraw() {
		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-withdraw-money'],

			mutationFn: (props: MutationProps['useWithdraw']) => {
				return GoalApi.withdrawItem({
					params: {...props.params, boardGoalId: boardGoalId!},
					payload: {...props.payload, type: TRANSACTION_TYPE.WITHDRAW},
				});
			},
		});

		return {
			withdrawGoal: mutate,
			isWithdrawGoalPending: isPending,
			isWithdrawGoalSuccess: isSuccess,
			isWithdrawGoalError: isError,
		};
	}

	static useTransfer() {
		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-transfer-money'],

			mutationFn: (props: MutationProps['useTransfer']) => {
				return GoalApi.transferItem({
					params: {boardGoalId: boardGoalId!},
					payload: props.payload,
				});
			},
		});

		return {
			transferGoal: mutate,
			isTransferGoalPending: isPending,
			isTransferGoalSuccess: isSuccess,
			isTransferGoalError: isError,
		};
	}
}
