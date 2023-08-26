import { Box, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface ToolbarProps {

	onReset: () => void;
	onDownload: () => void;

}

export default function Toolbar(props: ToolbarProps) {
	return (
		<Box sx={{ mt: 4 }}>
			<IconButton
				sx={{
					backgroundColor: "#eee",
					border: "1px solid #ccc",
					color: "#252525",
					marginRight: 1,
				}}
				title="Reset"
				onClick={props.onReset}
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
				onClick={props.onDownload}
			>
				<DownloadIcon />
			</IconButton>
		</Box>
	);
}
