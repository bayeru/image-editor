import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import LoadingScreen from './components/LoadingScreen';
import { routes } from "@/routes/routes";
import { queryClient } from "@/common/query-client";
import './App.css';

const router = createBrowserRouter(routes);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} fallbackElement={<LoadingScreen />} />
		</QueryClientProvider>
	);
}

export default App;
