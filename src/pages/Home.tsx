import { useLoaderData } from "react-router-dom";
import { Image } from "@/common/types";
import ImageList from "@/components/ImageList";
import { Container, Pagination, Stack } from "@mui/material";

// This function provides the data to our page
export const loader = async () => {
	const response = await fetch("https://picsum.photos/v2/list");
	const data = await response.json();

	return data;
};

export default function Home() {
	const images = (useLoaderData() as Image[]) || [];

	console.log("Images", images);

	return (
		<Container
			maxWidth={"lg"}
			sx={{
				marginTop: 16,
				marginBottom: 16
			}}
		>
			<ImageList images={images} />
			<Stack spacing={2} alignItems="center" marginTop={8}>
				<Pagination count={10} variant="outlined" shape="rounded" size="large" />
			</Stack>
		</Container>
	);
}
