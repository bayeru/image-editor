import { Image } from "@/common/types";


export const shallowEqual = (objA: any, objB: any) => {
	const aKeys = Object.keys(objA);
	const bKeys = Object.keys(objB);

	if (aKeys.length !== bKeys.length) {
		return false;
	}

	for (const key of aKeys) {
		if (objA[key] !== objB[key]) {
			return false;
		}
	}

	return true;
};


export const buildPicsumUrl = (image: Image) => {
	let url = `https://picsum.photos/id/${image.id}/${image.width}/${image.height}`;

	const searchParams = new URLSearchParams();

	if (image.greyscale) {
		searchParams.append("grayscale", "true");
	}

	if (image.blur > 0) {
		searchParams.append("blur", image.blur.toString());
	}

	if (searchParams.toString().length > 0) {
		url += "?" + searchParams.toString();
	}

	return url;
};
