import { useLoaderData } from "react-router-dom";
import { Image } from "@/common/types";
import ImageList from "@/components/ImageList";

export const loader = async () => {

	const response = await fetch("https://picsum.photos/v2/list");
	const data = await response.json();

	return data;
	
};

export default function Home() {
	const images = (useLoaderData() as Image[]) || [];

	console.log("Images", images);

	return (
		<div>
			<ImageList images={images} />			
		</div>
	);
}
