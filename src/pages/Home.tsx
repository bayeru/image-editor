import { LoaderFunctionArgs, redirect, useSearchParams } from "react-router-dom";
import { PicsumImage } from "@/common/types";
import ImageList from "@/components/ImageList";
import { Container } from "@mui/material";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const fetchImagesQuery = (page: number) => {
	return {
		queryKey: ["page", page || 1],
		queryFn: async () => {
			const response = await fetch(`https://picsum.photos/v2/list?page=${page}`);
			const data = await response.json();
			return data;
		},
	};
};

// This function provides the data to our page
export const loader = (queryClient: QueryClient) => {
	return async ({ request }: LoaderFunctionArgs) => {
		let page = new URL(request.url).searchParams.get("page");

		if (!page || isNaN(Number(page))) {
			return redirect("/images?page=1");
		}

		if (Number(page) > 34) {
			return redirect("/images?page=34");
		}

		return await queryClient.ensureQueryData(fetchImagesQuery(Number(page)));
	};
};

export default function Home() {

	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page"));
	const { data: images } = useQuery<PicsumImage[]>(fetchImagesQuery(page));

	console.log("Images", images, "Page", page);

	return (
		<Container
			maxWidth={"lg"}
			sx={{
				marginTop: 16,
				marginBottom: 16,
			}}
		>
			<ImageList images={images} />
			<Pagination page={page} />
		</Container>
	);
}
