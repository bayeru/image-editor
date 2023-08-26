import { Box, Container } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { SyntheticEvent, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { buildPicsumUrl } from '@/util/Util';
import { Image } from '@/common/types';
import ScrollToTop from '@/components/ScrollToTop';
import { saveAs } from 'file-saver';
import Sidebar from '@/components/Editor/Sidebar';
import Toolbar from '@/components/Editor/Toolbar';
import ImageViewer from '@/components/Editor/ImageViewer';
import { editedImagesDB } from '@/lib/idb';

export default function Editor() {
	const initialState = useLoaderData() as Image;
	const imageId = initialState.id;
	const defaultState = {
		id: imageId,
		width: 750,
		height: 500,
		greyscale: false,
		blur: 0,
		cachedImage: null,
		author: initialState.author,
	};
	const [imageUrl, setImageUrl] = useState(() => {
		if (initialState.cachedImage !== null) {
			return URL.createObjectURL(new Blob([initialState.cachedImage]));
		}

		return buildPicsumUrl(defaultState);
	});
	const [loading, setLoading] = useState(false);
	const [imageState, setImageState] = useState(initialState);

	const fetchImage = async (
		image: Image,
		updateLoadingState: boolean = true,
		cacheImage: boolean = true
	): Promise<string> => {
		// Update loading state if needed
		if (updateLoadingState) {
			setLoading(true);
		}

		// Fetch image after building the picsum url
		const response = await fetch(buildPicsumUrl(image));
		const imageBlob = await response.blob();
		const imageUrl = URL.createObjectURL(imageBlob);

		// Update image url
		setImageUrl(imageUrl);

		// Update loading state if needed
		if (updateLoadingState) {
			setLoading(false);
		}

		// Cache image if needed
		if (cacheImage) {
			const arrayBuffer = await imageBlob.arrayBuffer();
			editedImagesDB.put({
				...image,
				cachedImage: arrayBuffer,
			});
		}

		return imageUrl;
	};

	const debounceFetchImage = useMemo(() => debounce(fetchImage, 300), []);

	const handleWidthChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const newState = {
			...imageState,
			width: Number(evt.target.value),
		};

		setImageState(newState);
		debounceFetchImage(newState);
	};

	const handleHeightChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const newState = {
			...imageState,
			height: Number(evt.target.value),
		};

		setImageState(newState);
		debounceFetchImage(newState);
	};

	const handleGreyscaleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const newState = {
			...imageState,
			greyscale: evt.target.checked,
		};
		setImageState(newState);
		debounceFetchImage(newState);
	};

	const handleBlurChange = (evt: Event, value: number | number[], activeThumb: number) => {
		const newState = {
			...imageState,
			blur: value as number,
		};
		setImageState(newState);
		debounceFetchImage(newState);
	};

	const handleBlurChangeCommitted = (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
		const newState = {
			...imageState,
			blur: value as number,
		};
		setImageState(newState);
		debounceFetchImage(newState);
	};

	const handleReset = async () => {
		setImageState(defaultState);
		setImageUrl(buildPicsumUrl(defaultState));
		await editedImagesDB.delete(imageId);
	};

	const handleDownload = async () => {
		const filename = `${imageState.author.toLowerCase().replace(' ', '-')}-${imageState.id}.jpg`;

		// If the image url is not a blob, fetch the image and then download it
		if (!imageUrl.includes('blob')) {
			const newBlobUrl = await fetchImage(imageState, false, false);
			saveAs(newBlobUrl, filename);
			return;
		}

		// Just download the blob
		saveAs(imageUrl, filename);
	};

	return (
		<>
			<ScrollToTop />
			<Container
				maxWidth={'lg'}
				sx={{
					display: 'flex',
					marginTop: 16,
					marginBottom: 16,
					justifyContent: 'space-between',
					flexDirection: { xs: 'column', md: 'row' },
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						mr: 6,
					}}
				>
					<ImageViewer loading={loading} imageUrl={imageUrl} />
					<Toolbar onReset={handleReset} onDownload={handleDownload} />
				</Box>
				<Sidebar
					imageState={imageState}
					onWidthChange={handleWidthChange}
					onHeightChange={handleHeightChange}
					onGreyscaleChange={handleGreyscaleChange}
					onBlurChange={handleBlurChange}
					onBlurChangeCommitted={handleBlurChangeCommitted}
				/>
			</Container>
		</>
	);
}
