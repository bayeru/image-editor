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
import {loader as homeLoader} from "./pages/Home";

// Create a browser router with a main layout 
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route path="/" element={<Navigate to="/images" replace={true} />} />
			<Route path="/images" element={<Home />} loader={homeLoader}/>
			<Route path="/images/:imageId/edit" element={<Editor />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
