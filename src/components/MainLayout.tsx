import {
	AppBar,
	Box,
	Button,
	Toolbar,
	Typography,
} from "@mui/material";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
	return (
		<>
			<AppBar
				position={"fixed"}
				sx={{
					margin: 0,
					backgroundColor: "#fcfcfc",
					borderBottom: "1px solid rgba(0, 0, 0, 0.07)",
				}}
				elevation={0}
			>
				<Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Button
							onClick={() => {}}
							sx={{
								marginRight: 1,
							}}
						>
							<BurstModeIcon />
							<Typography
								sx={{
									ml: 1,
									variant: "h1",
									textTransform: "none",
								}}
							>
								ImagED
							</Typography>
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<div>
				<Outlet />
			</div>
		</>
	);
}