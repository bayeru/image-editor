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
		<MuiImageList cols={3} gap={16} sx={{ overflow: "hidden" }}>
			{images.map((item) => (
				<ImageListItem
					key={item.id}
					sx={{
						cursor: "pointer",
						borderRadius: 2,
						overflow: "hidden"
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
								"linear-gradient(to top, rgba(1,1,1,0.7) 0%, " +
								"rgba(1,1,1,0.3) 70%, rgba(1, 1, 1, 0) 100%)",
							"& .MuiImageListItemBar-titleWrap": {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							},
							"& .MuiImageListItemBar-title": {
								fontSize: "1.2rem",
							},							
							"& .MuiImageListItemBar-subtitle": {
								fontSize: "1rem",
								opacity: "0.7"
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
