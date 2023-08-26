import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
	const isEditor = useLocation().pathname.includes('/edit');
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	};

	return (
		<AppBar
			position={'fixed'}
			sx={{
				margin: 0,
				backgroundColor: '#f7f9fc'
			}}
			elevation={0}
		>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Button
						component={Link}
						to={'/'}
						sx={{
							marginRight: 1,
						}}
					>
						<BurstModeIcon fontSize="large"/>
						<Typography
							sx={{
								ml: 1,
								variant: 'h1',
								textTransform: 'none',
								fontWeight: 'bold',
							}}
							color='black'
						>
							ImagED
						</Typography>
					</Button>
				</Box>
				{isEditor && (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'end',
							alignItems: 'center',
						}}
					>
						<Button
							variant="outlined"
							size="medium"
							startIcon={<ArrowBackIcon />}
							sx={{
								boxShadow: 'none',
							}}
							onClick={handleBackClick}
						>
							BACK
						</Button>
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
}
