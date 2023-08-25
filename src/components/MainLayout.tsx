import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "./NavBar";
import { Box } from "@mui/material";
import MainFallback from "./MainFallback";

/**
 * Main layout for the application. Includes the nav bar and the <Outlet /> for the react router.
 */
export default function MainLayout() {

	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	console.log("Navigation", navigation);

	return (
		<>
			<NavBar />
			<Box>
				{isLoading && <MainFallback />}
				<Outlet />
			</Box>
		</>
	);
}