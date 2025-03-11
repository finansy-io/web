import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {Icon, LoadingWrapper, Spinner, useUploadField} from '@shared/ui';
import {cn, useResponsive} from '@shared/lib';
import {ReactNode} from 'react';

export function GoalImageField({children, isCreatePage}: {children: ReactNode; isCreatePage?: boolean}) {
	const {id} = useParams();

	const {isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	// const {UploadField, startUploading, abortUploading, uploadProgressPercent, isUploading, isFileDragging} =
	// 	useUploadField();
	const {UploadField, abortUploading, uploadProgressPercent, isUploading, isFileDragging} = useUploadField();

	const {isDesktop} = useResponsive();

	return (
		<UploadField onUpload={alert}>
			<div
				role='upload-field'
				className={cn(
					'flex h-[310px] flex-col items-end justify-between bg-secondary-grey',
					isUploading && 'bg-secondary-grey',
				)}
			>
				{children}

				{isFileDragging && (
					<div className='h-10 w-10 self-center text-primary-violet'>
						<Icon type='uploadImage' />
					</div>
				)}

				{isUploading && (
					<div className='cursor-default self-center text-center'>
						<div className='mb-4 font-semibold text-primary-violet'>{uploadProgressPercent}%</div>
						<div
							className={cn('cursor-pointer text-sm underline', isDesktop && 'hover:text-primary-violet')}
							onClick={abortUploading}
						>
							Cancel uploading
						</div>
					</div>
				)}

				<div className='mb-3 mr-3 p-1'>
					<LoadingWrapper isLoading={isGoalDetailsLoading && !isCreatePage} className='size-8 rounded-full'>
						<div
							className='flex size-8 items-center justify-center rounded-full bg-primary-violet text-white shadow-[0_0_0_2px_white_inset]'
							// onClick={startUploading}
							onClick={() => alert('Да, скоро можно будет загружать картинки 😁')}
						>
							{!isUploading ? <Icon type='uploadImage' className='size-4' /> : <Spinner className='size-4' />}
						</div>
					</LoadingWrapper>
				</div>
			</div>
		</UploadField>
	);
}
