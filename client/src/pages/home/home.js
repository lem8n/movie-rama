import './home.css';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
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
	setIsNewMovie,
	totalMovieNumber,
}) => {
	const navigate = useNavigate();

	return (
		<div>
			{fetchedMovies.length > 0 && Object.keys(fetchedMovies[0]).length > 0 ? (
				<>
					<div className="addButtonContainer">
						{isLoading ? (
							<CircularProgress color="secondary" sx={{ marginTop: '40px' }} />
						) : (
							isLoggedIn && (
								<Button
									className="newMovie"
									onClick={() => navigate('/new-movie')}
								>
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
							setIsNewMovie={setIsNewMovie}
							totalMovieNumber={totalMovieNumber}
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
				</>
			) : (
				<>
					{isLoggedIn ? (
						<>
							<div className="addButtonContainer">
								<Button
									className="newMovie"
									onClick={() => navigate('/new-movie')}
								>
									Add New Movie
								</Button>
							</div>

							<Typography
								gutterBottom
								variant="h5"
								component="div"
								style={{
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								Be the first one to add a movie
							</Typography>
						</>
					) : (
						<>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								style={{
									display: 'flex',
									justifyContent: 'center',
									marginTop: '25px',
								}}
							>
								There are no movies added yet
							</Typography>
							<Typography
								style={{
									display: 'flex',
									justifyContent: 'center',
									fontSize: '13px',
									marginTop: '3px',
								}}
							>
								<a href="/log-in" style={{ color: 'blue' }}>
									Log in
								</a>
								&nbsp;or&nbsp;
								<a href="/sign-up" style={{ color: 'blue' }}>
									Sign Up
								</a>
								&nbsp;and be the first to add a movie
							</Typography>
						</>
					)}
				</>
			)}
		</div>
	);
};
