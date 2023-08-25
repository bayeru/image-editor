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
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { SyntheticEvent, useMemo, useState } from "react";
import { debounce } from "lodash";
import { ImageDB } from "@/lib/idb";
import { buildPicsumUrl } from "@/util/Util";
import { Image } from "@/common/types";

const editedImagesDB = new ImageDB("image-db");

// This function provides data to the editor page
export const loader = async ({ params }:LoaderFunctionArgs)  => {

	const imageId = params.imageId;
	const defaultState = {
		id: imageId,
		width: 750,
		height: 500,
		greyscale: false,
		blur: 0,
		cachedImage: null
	};

	if (imageId !== undefined) {
		const cachedImage = await editedImagesDB.get(imageId);

		if (cachedImage !== undefined) {
			console.log("Returning cached image", cachedImage);
			return cachedImage;
		}
	}

	return defaultState;

};

export default function Editor() {

	const initialState = (useLoaderData() as Image);
	const imageId = initialState.id;
	const defaultState = {
		id: imageId,
		width: 750,
		height: 500,
		greyscale: false,
		blur: 0,
		cachedImage: null
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

	const fetchImage = async (image: Image) => {
		console.log("fetchImage", image);
		setLoading(true);
		const url = buildPicsumUrl(image);
		const response = await fetch(url);
		const imageBlog = await response.blob();
		console.log("imageBlog", imageBlog);		
		const imageUrl = URL.createObjectURL(imageBlog);
		setImageUrl(imageUrl);
		setLoading(false);
		const arrayBuffer = await imageBlog.arrayBuffer();
		editedImagesDB.put({
			...image,
			cachedImage: arrayBuffer
		});
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

	const handleReset = () => {
		setImageState(defaultState);
		debounceFetchImage(defaultState);
	};

	return (
		<Container
			maxWidth={"lg"}
			sx={{
				display: "flex",
				marginTop: 16,
				marginBottom: 16,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					p: 4,
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
				<Box sx={{ mb: 4 }}>
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
						href={imageUrl}
						download
					>
						<DownloadIcon />
					</IconButton>
				</Box>
			</Box>
			<Box
				width={460}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "center",
					p: 4,
					paddingTop: 1,
				}}
			>
				<div></div>
				<FormControl>
					<Stack sx={{ maxHeight: 385, overflowY: "auto", p: 4 }} spacing={2}>
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
	);
}