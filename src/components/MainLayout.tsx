import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

/**
 * Main layout for the application. Includes the nav bar and the <Outlet /> for the react router.
 */
export default function MainLayout() {
	return (
		<>
			<NavBar />
			<div>
				<Outlet />
			</div>
		</>
	);
}