import { ImageList as MuiImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { PicsumImage } from '@/common/types';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import NewReleasesTwoToneIcon from '@mui/icons-material/NewReleasesTwoTone';

interface ImageListProps {
	images: PicsumImage[] | undefined;
	editedImages: string[];
}

export default function ImageList({ images, editedImages }: ImageListProps) {
	if (images === undefined) {
		return <LoadingScreen />;
	}

	return (
		<MuiImageList
			cols={3}
			gap={16}
			sx={{
				overflow: 'hidden',
				gridTemplateColumns: 'repeat(auto-fill, minmax(367px, 1fr)) !important',
			}}
		>
			{images.map((item) => (
				<Link to={`/images/${item.id}/edit`} key={item.id}>
					<ImageListItem
						sx={{
							cursor: 'pointer',
							borderRadius: 2,
							overflow: 'hidden',
						}}
					>
						<img
							src={`https://picsum.photos/id/${item.id}/367/267`}
							width="367px"
							height="267px"
							alt={item.author}
							loading="lazy"
						/>
						<ImageListItemBar
							sx={{
								background:
									'linear-gradient(to top, rgba(1,1,1,0.7) 0%, ' + 'rgba(1,1,1,0.3) 70%, rgba(1, 1, 1, 0) 100%)',
								'& .MuiImageListItemBar-titleWrap': {
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								},
								'& .MuiImageListItemBar-title': {
									fontSize: '1.2rem',
								},
								'& .MuiImageListItemBar-subtitle': {
									fontSize: '1rem',
									opacity: '0.7',
								},
							}}
							title={item.author}
							subtitle={`#${item.id}`}
						/>
						{editedImages.includes(item.id) && (
							<NewReleasesTwoToneIcon
								sx={{
									position: 'absolute',
									top: 0,
									right: 0,
									margin: 1,
								}}
								fontSize="large"
								color="warning"
							/>
						)}
					</ImageListItem>
				</Link>
			))}
		</MuiImageList>
	);
}
