import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './themes/theme';
import { NavBar } from './nav-bar/nav-bar';
import { SignUpForm } from './pages/signUpForm/signUpForm';
import { LogInInForm } from './pages/logInForm/logInForm';
import { NewMovieForm } from './pages/newMovieForm/newMovieForm';
import { Home } from './pages/home/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { findAll } from './api/movies';
import { validateToken } from './api/users';

const App = () => {
	const [signedInUser, setSignedInUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [fetchedMovies, setFetchedMovies] = useState([{}]);
	const [isLoading, setIsLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [totalMovieNumber, setTotalMovieNumber] = useState(0);
	const [page, setPage] = useState(1);
	const [sortedBy, setSortedBy] = useState('all');
	const [sortedValue, setSortedValue] = useState('');
	const [isNewMovie, setIsNewMovie] = useState(false);

	useEffect(() => {
		findAll(page, sortedBy, sortedValue)
			.then((result) => {
				if (result) {
					setFetchedMovies(result.movies);
					setTotalMovieNumber(result.totalMovies);
					setTotalPages(Math.ceil(result.totalMovies / 10));
				}
			})
			.catch((error) => {
				console.log(error);
			});

		validateToken()
			.then((token) => {
				if (token && token.data) {
					setSignedInUser(token.data);
					setIsLoggedIn(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		setIsNewMovie(false);
	}, [page, sortedBy, sortedValue, isNewMovie]);

	// TODO: Cookie validity request, create endpoint so if a cookie exists and it's active keep the user logged in

	return (
		<ThemeProvider theme={appTheme}>
			<CssBaseline enableColorScheme />
			<div className="App">
				<Router>
					<NavBar
						isLoggedIn={isLoggedIn}
						setIsLoggedIn={setIsLoggedIn}
						signedInUser={signedInUser}
						setSignedInUser={setSignedInUser}
						setIsLoading={setIsLoading}
						setSortedBy={setSortedBy}
						setSortedValue={setSortedValue}
						page={page}
						setPage={setPage}
					/>
					<Routes>
						<Route
							exact
							path="/"
							element={
								<Home
									isLoggedIn={isLoggedIn}
									signedInUser={signedInUser}
									fetchedMovies={fetchedMovies}
									setFetchedMovies={setFetchedMovies}
									isLoading={isLoading}
									setIsLoading={setIsLoading}
									sortedBy={sortedBy}
									setSortedBy={setSortedBy}
									setSortedValue={setSortedValue}
									sortedValue={sortedValue}
									page={page}
									setPage={setPage}
									totalPages={totalPages}
									setTotalPages={setTotalPages}
									setIsNewMovie={setIsNewMovie}
									totalMovieNumber={totalMovieNumber}
								/>
							}
						></Route>
						<Route
							exact
							path="/log-in"
							element={
								<LogInInForm
									setIsLoggedIn={setIsLoggedIn}
									setSignedInUser={setSignedInUser}
									setIsLoading={setIsLoading}
								/>
							}
						></Route>
						<Route exact path="/sign-up" element={<SignUpForm />}></Route>
						<Route
							exact
							path="/new-movie"
							element={
								<NewMovieForm
									fetchedMovies={fetchedMovies}
									signedInUser={signedInUser}
									setPage={setPage}
									setIsNewMovie={setIsNewMovie}
									totalMovieNumber={totalMovieNumber}
								/>
							}
						></Route>
					</Routes>
				</Router>
			</div>
		</ThemeProvider>
	);
};

export default App;
