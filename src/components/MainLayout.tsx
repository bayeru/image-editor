import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Box } from "@mui/material";

/**
 * Main layout for the application. Includes the nav bar and the <Outlet /> for the react router.
 */
export default function MainLayout() {
	return (
		<>
			<NavBar />
			<Box>
				<Outlet />
			</Box>
		</>
	);
}