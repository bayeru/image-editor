import { LoaderFunctionArgs, redirect, useLoaderData, useSearchParams } from "react-router-dom";
import { PicsumImage } from "@/common/types";
import ImageList from "@/components/ImageList";
import { Container } from "@mui/material";
import Pagination from "@/components/Pagination";

// This function provides the data to our page
export const loader = async ({ request }:LoaderFunctionArgs) => {

	let page = new URL(request.url).searchParams.get('page');

	if (!page || isNaN(Number(page))) {
		return redirect('/images?page=1');
	}

	if (Number(page) > 34) {
		return redirect('/images?page=34');
	}

	const response = await fetch(`https://picsum.photos/v2/list?page=${page}`);
	const data = await response.json();

	return data;
};

export default function Home() {

	const images = (useLoaderData() as PicsumImage[]) || [];
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get('page'));
	console.log("Images", images, "Page", page);

	return (
		<Container
			maxWidth={"lg"}
			sx={{
				marginTop: 16,
				marginBottom: 16
			}}
		>
			<ImageList images={images} />
			<Pagination page={page} />			
		</Container>
	);
}
