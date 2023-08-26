import { useLoaderData, useSearchParams } from 'react-router-dom';
import ImageList from '@/components/ImageList';
import { Container } from '@mui/material';
import Pagination from '@/components/Pagination';
import { PicsumImage } from '@/common/types';

export default function Home() {
	const { editedImages, images } = useLoaderData() as {
		editedImages: string[];
		images: PicsumImage[];
	};
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get('page'));

	return (
		<Container
			maxWidth={'lg'}
			sx={{
				marginTop: 16,
				marginBottom: 16,
			}}
		>
			<ImageList images={images} editedImages={editedImages} />
			<Pagination page={page} />
		</Container>
	);
}
