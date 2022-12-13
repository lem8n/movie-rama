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
	const [allMovies, setAllMovies] = useState([{}]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// If allUsers is populated don't run it again
		findAll()
			.then((movies) => {
				if (movies && movies.data) {
					setAllMovies(movies.data);
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
	}, []);

	// TODO: Cookie validity request, create endpoint so if a cookie exists and it's active keep the user logged in

	return (
		<ThemeProvider theme={appTheme}>
			<CssBaseline enableColorScheme />
			{Object.keys(allMovies[0]).length > 0 && (
				<div className="App">
					<Router>
						<NavBar
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
							signedInUser={signedInUser}
							setSignedInUser={setSignedInUser}
							setIsLoading={setIsLoading}
						/>
						<Routes>
							<Route
								exact
								path="/"
								element={
									<Home
										isLoggedIn={isLoggedIn}
										signedInUser={signedInUser}
										allMovies={allMovies}
										setAllMovies={setAllMovies}
										isLoading={isLoading}
										setIsLoading={setIsLoading}
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
										allMovies={allMovies}
										setAllMovies={setAllMovies}
										signedInUser={signedInUser}
										setIsLoading={setIsLoading}
									/>
								}
							></Route>
						</Routes>
					</Router>
				</div>
			)}
		</ThemeProvider>
	);
};

export default App;
