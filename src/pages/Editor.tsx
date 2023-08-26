import {
	Box,
	CircularProgress,
	Container,
	FormControl,
	FormControlLabel,
	IconButton,
	Slider,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { SyntheticEvent, useMemo, useState } from "react";
import { debounce } from "lodash";
import { ImageDB } from "@/lib/idb";
import { buildPicsumUrl } from "@/util/Util";
import { Image } from "@/common/types";
import ScrollToTop from "@/components/ScrollToTop";
import { QueryClient } from "@tanstack/react-query";
import { saveAs } from "file-saver";

const editedImagesDB = new ImageDB("image-db");

const fetchImageInfoQuery = (imageId: string) => {

	return {
		queryKey: ["imageId", imageId],
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
				console.log("Returning cached image", cachedImage);
				return cachedImage;
			}
		}

		if (imageId === undefined || isNaN(Number(imageId))) {
			return redirect("/images?page=1");
		}

		const data = await queryClient.ensureQueryData(fetchImageInfoQuery(imageId));

		const defaultState = {
			id: imageId,
			width: 750,
			height: 500,
			greyscale: false,
			blur: 0,
			cachedImage: null,
			author: data.author
		};

		return defaultState;

	};

};

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
		author: initialState.author
	};
	const [imageUrl, setImageUrl] = useState(() => {
		if (initialState.cachedImage !== null) {
			return URL.createObjectURL(new Blob([initialState.cachedImage]));
		}

		return buildPicsumUrl(defaultState);
	});
	const [loading, setLoading] = useState(false);
	const [imageState, setImageState] = useState(initialState);

	console.log("imageState", imageState, "loading", loading);

	const fetchImage = async (image: Image, updateLoadingState: boolean = true, cacheImage: boolean = true):Promise<string> => {
		
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

	const handleBlurChangeCommitted = (
		event: Event | SyntheticEvent<Element, Event>,
		value: number | number[]
	) => {
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

		console.log("handleDownload", imageUrl);
		const filename = `${imageState.author.toLowerCase().replace(' ', '-')}-${imageState.id}.jpg`;

		// If the image url is not a blob, fetch the image and then download it
		if (!imageUrl.includes("blob")) {
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
				maxWidth={"lg"}
				sx={{
					display: "flex",
					marginTop: 16,
					marginBottom: 16,
					justifyContent: "space-between",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<Box
						sx={{
							position: "relative",
							width: "750px",
							height: "500px",
							overflow: "overlay",
							backgroundColor: "#eee",
						}}
					>
						{loading && (
							<CircularProgress
								sx={{
									position: "absolute",
									top: "50%",
									left: "50%",
									marginTop: "-20px",
									marginLeft: "-20px",
								}}
							/>
						)}
						<img
							src={imageUrl}
							style={{
								position: "absolute",
								opacity: loading ? 0.3 : 1,
							}}
						/>
					</Box>
					<Box sx={{ mt: 4 }}>
						<IconButton
							sx={{
								backgroundColor: "#eee",
								border: "1px solid #ccc",
								color: "#252525",
								marginRight: 1,
							}}
							title="Reset"
							onClick={handleReset}
						>
							<RestartAltIcon />
						</IconButton>
						<IconButton
							sx={{
								backgroundColor: "#eee",
								border: "1px solid #ccc",
								color: "#252525",
							}}
							title="Download"
							onClick={handleDownload}
						>
							<DownloadIcon />
						</IconButton>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start",
						alignItems: "center",
						paddingTop: 1,
					}}
				>
					<div></div>
					<Typography variant="h6" sx={{ mb: 2 }}>
						{imageState.author} - #{imageState.id}
					</Typography>
					<FormControl>
						<Stack spacing={2}>
							<TextField
								label="Width"
								variant="outlined"
								value={imageState.width}
								size="small"
								type="number"
								onChange={handleWidthChange}
							/>
							<TextField
								label="Height"
								variant="outlined"
								value={imageState.height}
								size="small"
								type="number"
								onChange={handleHeightChange}
							/>
							<FormControlLabel
								control={<Switch checked={imageState.greyscale} onChange={handleGreyscaleChange} />}
								label="Greyscale"
							/>
							<Box>
								<Typography id="blur-slider">Blur</Typography>
								<Slider
									aria-label="blur-slider"
									valueLabelDisplay="auto"
									value={imageState.blur}
									getAriaValueText={function valuetext(value: number) {
										return `${value}`;
									}}
									step={1}
									marks
									min={0}
									max={10}
									onChange={handleBlurChange}
									onChangeCommitted={handleBlurChangeCommitted}
								/>
							</Box>
						</Stack>
					</FormControl>
				</Box>
			</Container>
		</>
	);
}
