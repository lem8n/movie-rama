import { Pagination } from '@mui/material';
import './pagination.css';
import { findAll } from '../../../api/movies';

export const PaginationItem = ({
	totalPages,
	page,
	setPage,
	sortedBy,
	sortedValue,
	setFetchedMovies,
	setTotalPages,
}) => {
	const handlePageChange = async (pageToGo) => {
		if (page === pageToGo) {
			return;
		}
		try {
			const result = await findAll(pageToGo, sortedBy, sortedValue);
			if (result) {
				setPage(pageToGo);
				setFetchedMovies(result.movies);
				setTotalPages(Math.ceil(result.totalMovies / 10));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Pagination
			count={totalPages}
			className="pagination"
			page={page}
			onChange={(evt, page) => handlePageChange(page)}
		/>
	);
};
