import './App.css';
import {
	Navigate,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Editor from './pages/Editor';
import Home from './pages/Home';
import { loader as homeLoader } from './pages/Home';
import { loader as editorLoader } from './pages/Editor';
import LoadingScreen from './components/LoadingScreen';
import Error from './components/Error';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
		},
	},
});

// Create a browser router with a main layout
const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<MainLayout />} errorElement={<Error />}>
				<Route
					path="/"
					element={<Navigate to="/images?page=1" replace={true} />}
				/>
				<Route
					path="/images"
					element={<Home />}
					loader={homeLoader(queryClient)}
				/>
				<Route
					path="/images/:imageId/edit"
					element={<Editor />}
					loader={editorLoader(queryClient)}
				/>
			</Route>
		</>,
	),
);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} fallbackElement={<LoadingScreen />} />;
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
