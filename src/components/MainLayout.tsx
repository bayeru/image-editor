import { Outlet, useNavigation } from 'react-router-dom';
import NavBar from './NavBar';
import { Box } from '@mui/material';
import LoadingScreen from './LoadingScreen';

export default function MainLayout() {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	return (
		<>
			<NavBar />
			<Box
				sx={{
					paddingBottom: 1,
				}}
			>
				{isLoading && <LoadingScreen />}
				<Outlet />
			</Box>
		</>
	);
}
