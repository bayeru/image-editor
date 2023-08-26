import { Box, FormControl, FormControlLabel, Slider, Stack, Switch, TextField, Typography } from '@mui/material';

import { Image } from '@/common/types';

interface SidebarProps {
	imageState: Image;
	onWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onHeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onGreyscaleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlurChange: (evt: Event, value: number | number[], activeThumb: number) => void;
	onBlurChangeCommitted: (event: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => void;
}

export default function Sidebar(props: SidebarProps) {
	const imageState = props.imageState;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'center',
				minWidth: '250px',
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
						onChange={props.onWidthChange}
					/>
					<TextField
						label="Height"
						variant="outlined"
						value={imageState.height}
						size="small"
						type="number"
						onChange={props.onHeightChange}
					/>
					<FormControlLabel
						control={<Switch checked={imageState.greyscale} onChange={props.onGreyscaleChange} />}
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
							onChange={props.onBlurChange}
							onChangeCommitted={props.onBlurChangeCommitted}
						/>
					</Box>
				</Stack>
			</FormControl>
		</Box>
	);
}
