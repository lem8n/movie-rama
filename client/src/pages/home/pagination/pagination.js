import { Pagination } from '@mui/material';
import './pagination.css';
import { searchMovies } from '../../../api/tmdb';
import { useNavigate } from 'react-router-dom';

export const PaginationItem = ({
	totalPages,
	page,
	setPage,
	setSearchResult,
	searchPhrase,
}) => {
	const navigate = useNavigate();
	const handlePageChange = async (pageToGo) => {
		try {
			const movies = await searchMovies(searchPhrase, pageToGo);
			window.scroll(0, 0);
			if (movies) {
				setPage(pageToGo);
				setSearchResult(movies.data.results);
				navigate(`/movies?query=${searchPhrase}&page=${pageToGo}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Pagination
			count={totalPages}
			color="secondary"
			className="pagination"
			size="large"
			page={page}
			onChange={(evt, page) => handlePageChange(page)}
		/>
	);
};
