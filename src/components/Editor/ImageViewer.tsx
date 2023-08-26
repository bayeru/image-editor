import { Box, CircularProgress } from '@mui/material';

interface ImageViewerProps {
	loading: boolean;
	imageUrl: string;
}

export default function ImageViewer({ loading, imageUrl }: ImageViewerProps) {
	return (
		<Box
			sx={{
				position: 'relative',
				width: '750px',
				height: '500px',
				overflow: 'overlay',
				backgroundColor: '#eee',
			}}
		>
			{loading && (
				<CircularProgress
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						marginTop: '-20px',
						marginLeft: '-20px',
					}}
				/>
			)}
			<img
				src={imageUrl}
				alt="Edit"
				style={{
					position: 'absolute',
					opacity: loading ? 0.3 : 1,
				}}
			/>
		</Box>
	);
}
