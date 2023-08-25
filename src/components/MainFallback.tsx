import { CircularProgress, Container } from "@mui/material";

export default function MainFallback() {
	return (
		<Container
			sx={{
				display: "flex",
				width: "100%",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress />
		</Container>
	);
}
