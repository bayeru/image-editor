import {
	Container,
	ImageList as MuiImageList,
	ImageListItem,
	ImageListItemBar,
} from "@mui/material";
import { Image } from "@/common/types";

interface ImageListProps {
	images: Image[];
}

export default function ImageList({ images }: ImageListProps) {
	return (
		<MuiImageList cols={3} sx={{ overflow: "hidden" }}>
			{images.map((item) => (
				<ImageListItem
					key={item.id}
					sx={{
						cursor: "pointer",
					}}
				>
					<img
						src={`https://picsum.photos/id/${item.id}/367/267`}
						srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
						alt={item.author}
						loading="lazy"
					/>
					<ImageListItemBar
						sx={{
							background:
								"linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
								"rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.2) 100%)",
							"& .MuiImageListItemBar-titleWrap": {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							},
							"& .MuiImageListItemBar-subtitle": {
								fontSize: "1rem",
							},
						}}
						title={item.author}
						subtitle={`#${item.id}`}
					/>
				</ImageListItem>
			))}
		</MuiImageList>
	);
}
