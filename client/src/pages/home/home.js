import './home.css';
import { Button, CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MovieListItem } from './movie-list-item/movie-list-item';
import { PaginationItem } from './pagination/pagination';
import { Filters } from './filters/filters';

export const Home = ({
	fetchedMovies,
	setFetchedMovies,
	isLoggedIn,
	signedInUser,
	isLoading,
	setIsLoading,
	sortedBy,
	setSortedBy,
	setSortedValue,
	sortedValue,
	page,
	setPage,
	totalPages,
	setTotalPages,
}) => {
	const navigate = useNavigate();

	return (
		<div>
			<div className="addButtonContainer">
				{isLoading ? (
					<CircularProgress color="secondary" sx={{ marginTop: '40px' }} />
				) : (
					isLoggedIn && (
						<Button className="newMovie" onClick={() => navigate('/new-movie')}>
							Add New Movie
						</Button>
					)
				)}
			</div>
			<PaginationItem
				totalPages={totalPages}
				page={page}
				setPage={setPage}
				sortedBy={sortedBy}
				sortedValue={sortedValue}
				setFetchedMovies={setFetchedMovies}
				setTotalPages={setTotalPages}
			/>
			<Stack spacing={2} className="stack-container">
				<Filters
					setFetchedMovies={setFetchedMovies}
					setSortedBy={setSortedBy}
					setPage={setPage}
					page={page}
				/>
				<MovieListItem
					fetchedMovies={fetchedMovies}
					isLoggedIn={isLoggedIn}
					setFetchedMovies={setFetchedMovies}
					signedInUser={signedInUser}
					isLoading={isLoading}
					setPage={setPage}
					setIsLoading={setIsLoading}
					setSortedBy={setSortedBy}
					setSortedValue={setSortedValue}
				/>
			</Stack>

			<PaginationItem
				totalPages={totalPages}
				page={page}
				setPage={setPage}
				sortedBy={sortedBy}
				sortedValue={sortedValue}
				setFetchedMovies={setFetchedMovies}
				setTotalPages={setTotalPages}
			/>
		</div>
	);
};
