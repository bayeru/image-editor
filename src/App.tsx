import "./App.css";
import {
	Navigate,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import { loader as homeLoader } from "./pages/Home";
import { loader as editorLoader } from "./pages/Editor";
import LoadingScreen from "./components/LoadingScreen";
import Error from "./components/Error";

// Create a browser router with a main layout
const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<MainLayout />} errorElement={<Error />}>
				<Route path="/" element={<Navigate to="/images?page=1" replace={true} />} />
				<Route path="/images" element={<Home />} loader={homeLoader} />
				<Route path="/images/:imageId/edit" element={<Editor />} loader={editorLoader} />
			</Route>
		</>
	)
);

function App() {
	return <RouterProvider router={router} fallbackElement={<LoadingScreen />} />;
}

export default App;
