import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { editedImagesDB } from '@/lib/idb';

const fetchImageInfoQuery = (imageId: string) => {
	return {
		queryKey: ['imageId', imageId],
		queryFn: async () => {
			const response = await fetch(`https://picsum.photos/id/${imageId}/info`);
			const data = await response.json();
			return data;
		},
	};
};

export const loader = (queryClient: QueryClient) => {
	return async ({ params }: LoaderFunctionArgs) => {
		const imageId = params.imageId;

		if (imageId !== undefined) {
			const cachedImage = await editedImagesDB.get(imageId);

			if (cachedImage !== undefined) {
				return cachedImage;
			}
		}

		if (imageId === undefined || isNaN(Number(imageId))) {
			return redirect('/images?page=1');
		}

		const data = await queryClient.ensureQueryData(fetchImageInfoQuery(imageId));

		const defaultState = {
			id: imageId,
			width: 750,
			height: 500,
			greyscale: false,
			blur: 0,
			cachedImage: null,
			author: data.author,
		};

		return defaultState;
	};
};
