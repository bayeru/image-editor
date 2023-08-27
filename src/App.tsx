import './App.css';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Editor from './pages/Editor';
import Home from './pages/Home';
import { loader as homeLoader } from '@/loaders/home-loader';
import { loader as editorLoader } from '@/loaders/editor-loader';
import LoadingScreen from './components/LoadingScreen';
import Error from './components/Error';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
		},
	},
});

export const routes = createRoutesFromElements(
	<>
		<Route path="/" element={<MainLayout />} errorElement={<Error />}>
			<Route path="/" element={<Navigate to="/images?page=1" replace={true} />} />
			<Route path="/images" element={<Home />} loader={homeLoader(queryClient)} />
			<Route path="/images/:imageId/edit" element={<Editor />} loader={editorLoader(queryClient)} />
		</Route>
	</>
);

const router = createBrowserRouter(routes);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} fallbackElement={<LoadingScreen />} />
		</QueryClientProvider>
	);
}

export default App;
