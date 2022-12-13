import './home.css';
import { Button, CircularProgress, PaginationItem, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MovieListItem } from './movie-list-item/movie-list-item';

export const Home = ({
	allMovies,
	setAllMovies,
	isLoggedIn,
	signedInUser,
	isLoading,
	setIsLoading,
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
				{/*<PaginationItem*/}
				{/*// totalPages={totalPages}*/}
				{/*// page={page}*/}
				{/*// setPage={setPage}*/}
				{/*// setSearchResult={setSearchResult}*/}
				{/*// searchPhrase={searchPhrase}*/}
				{/*/>*/}
			</div>

			<Stack spacing={2} className="stack-container">
				<MovieListItem
					allMovies={allMovies}
					isLoggedIn={isLoggedIn}
					setAllMovies={setAllMovies}
					signedInUser={signedInUser}
					setIsLoading={setIsLoading}
					// searchPhrase={searchPhrase}
					// searchResult={searchResult}
					// searchHappened={searchHappened}
				/>
			</Stack>

			{/*<PaginationItem*/}
			{/*// totalPages={totalPages}*/}
			{/*// page={page}*/}
			{/*// setPage={setPage}*/}
			{/*// setSearchResult={setSearchResult}*/}
			{/*// searchPhrase={searchPhrase}*/}
			{/*/>*/}
		</div>
	);
};
