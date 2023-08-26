import { Container } from '@mui/material';

export default function Error() {
	return (
		<Container
			sx={{
				display: 'flex',
				width: '100%',
				height: '100vh',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<h1>404 - Page Not Found</h1>
		</Container>
	);
}
