import { Link } from "react-router-dom";
import { Pagination as MuiPagination, PaginationItem, Stack } from "@mui/material";

interface PaginationProps {
	page: number;
}

export default function Pagination({ page }: PaginationProps) {
	return (
		<Stack spacing={2} alignItems="center" marginTop={8}>
			<MuiPagination
				page={page}
				count={10}
				variant="outlined"
				shape="rounded"
				size="large"
				renderItem={(item) => {
					return <PaginationItem component={Link} to={`/images?page=${item.page}`} {...item} />;
				}}
			/>
		</Stack>
	);
}
