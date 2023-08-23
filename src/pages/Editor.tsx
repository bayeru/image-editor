import {
	Box,
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
import { useParams } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export default function Editor() {
	// Get params from the URL
	const params = useParams();
	const imageId = params.imageId;
	const [imageState, setImageState] = useState({
		width: 750,
		height: 500,
		greyscale: false,
		blur: 0,
	});
	

	useEffect(() => {

		const url = buildImageUrl();
		updateImageUrl(url);

	}, [imageState]);

	const fetchImage = async (url:string) => {
		console.log("[fetchImage] url", url);
		const response = await fetch(url);
		const imageBlog = await response.blob();
		const imageUrl = URL.createObjectURL(imageBlog);
		setImageUrl(imageUrl);
	};

	const updateImageUrl = useMemo(() => debounce(fetchImage, 1000), []);
	const buildImageUrl = () => {
		console.log("building image url", imageState);
		let url = `https://picsum.photos/id/${imageId}/${imageState.width}/${imageState.height}`;

		const searchParams = new URLSearchParams();

		if (imageState.greyscale) {
			searchParams.append("grayscale", "true");
		}

		if (imageState.blur > 0) {
			searchParams.append("blur", imageState.blur.toString());
		}

		if (searchParams.toString().length > 0) {
			url += "?" + searchParams.toString();
		}

		console.log("returning url", url)
		return url;
	};

	const [imageUrl, setImageUrl] = useState(() => buildImageUrl());

	const handleWidthChange = (evt: React.ChangeEvent<HTMLInputElement>) => {		
		setImageState({
			...imageState,
			width: Number(evt.target.value),
		});
	};

	const handleHeightChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setImageState({
			...imageState,
			height: Number(evt.target.value),
		});
	};

	const handleGreyscaleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setImageState({
			...imageState,
			greyscale: evt.target.checked,
		});
	};

	const handleBlurChange = (evt:Event, value: number | number[], activeThumb: number) => {
		setImageState({
			...imageState,
			blur: value as number,
		});
	};

	const handleBlurChangeCommitted = (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
		setImageState({
			...imageState,
			blur: value as number,
		});
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
				<img src={imageUrl} />
				<Box sx={{ mb: 4 }}>
					<IconButton
						sx={{
							backgroundColor: "#eee",
							border: "1px solid #ccc",
							color: "#252525",
							marginRight: 1,
						}}
						title="Reset"
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
							control={<Switch onChange={handleGreyscaleChange} />}
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
