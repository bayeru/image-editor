export interface PicsumImage {
	id: string;
	author: string;
	width: number;
	height: number;
	url: string;
	download_url: string;
}

export interface Image {
	id: string;
	width: number,
	height: number,
	greyscale: boolean,
	blur: number,
	cachedImage: ArrayBuffer | null,
	author: string,
}