import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { editedImagesDB } from '@/lib/idb';
import { PicsumImage } from '@/common/types';

const fetchImagesQuery = (page: number) => {
	return {
		queryKey: ['page', page || 1],
		queryFn: async () => {
			const response = await fetch(
				`https://picsum.photos/v2/list?page=${page}`,
			);
			const data = await response.json();
			return data;
		},
	};
};

export const loader = (queryClient: QueryClient) => {
	return async ({ request }: LoaderFunctionArgs) => {
		let page = new URL(request.url).searchParams.get('page');

		if (!page || isNaN(Number(page))) {
			return redirect('/images?page=1');
		}

		if (Number(page) > 34) {
			return redirect('/images?page=34');
		}

		const allKeys = await editedImagesDB.getAllKeys();
		const images = await queryClient.ensureQueryData<PicsumImage[]>(
			fetchImagesQuery(Number(page)),
		);

		return {
			editedImages: allKeys,
			images,
		};
	};
};
