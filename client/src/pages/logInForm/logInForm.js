import { TextField, Button, FormControl } from '@mui/material';
import './logInForm.css';
import { useState } from 'react';
import { logIn } from '../../api/users';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

export const LogInInForm = ({
	setIsLoggedIn,
	setSignedInUser,
	setIsLoading,
}) => {
	const navigate = useNavigate();
	const alert = useAlert();
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [isFieldEmpty, setIsFieldEmpty] = useState(true);
	const [wrongLogin, setWrongLogin] = useState(false);

	// Provide handling on user's inputs
	const handleOnChange = (event, inputType) => {
		// Local variable to check for duplicates
		const userInput = {
			email: user.email,
			password: user.password,
		};

		switch (inputType) {
			case 'email':
				userInput.email = event.target.value;
				setUser({ ...user, email: event.target.value });
				break;
			case 'password':
				userInput.password = event.target.value;
				setUser({ ...user, password: event.target.value });
				break;
			default:
				break;
		}

		if (userInput.email !== '' && userInput.password !== '') {
			setIsFieldEmpty(false);
		} else {
			setIsFieldEmpty(true);
			setWrongLogin(false);
		}
	};

	const userLogIn = async () => {
		// Call the signUp API
		try {
			const userLogIn = await logIn(user);
			if (Object.keys(userLogIn.data).length === 0) {
				setWrongLogin(true);
				return;
			}

			if (userLogIn.data.user) {
				setWrongLogin(false);
				setIsLoggedIn(true);
				setSignedInUser(userLogIn.data.user);
				alert.success('You are now logged in', {
					timeout: 2000,
				});
				setIsLoading(true);
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="loginBox">
			<form
				className="loginForm"
				onSubmit={(event) => {
					userLogIn();
					event.preventDefault();
				}}
			>
				<FormControl>
					<h1 style={{ textAlign: 'center' }}>Log In Below</h1>
					<TextField
						id="email"
						type="email"
						color="secondary"
						size="small"
						label="E-mail"
						onChange={(evt) => handleOnChange(evt, 'email')}
						variant="outlined"
					/>
					<TextField
						id="password"
						color="warning"
						type="password"
						size="small"
						label="Password"
						onChange={(evt) => handleOnChange(evt, 'password')}
						variant="outlined"
						style={{ marginTop: '8px' }}
					/>
					{wrongLogin && (
						<small
							style={{
								fontSize: '13px',
								textAlign: 'center',
								marginTop: '3px',
								color: '#a00000',
							}}
						>
							Email or password is incorrect
						</small>
					)}
					<Button
						className="loginButton"
						type="submit"
						color="success"
						variant="contained"
						disabled={isFieldEmpty}
					>
						Sign In
					</Button>
					<small
						style={{
							fontSize: '11px',
							textAlign: 'center',
							marginTop: '3px',
						}}
					>
						If you don't have an account{' '}
						<a style={{ color: 'blue' }} href="/sign-up">
							Sign Up
						</a>
					</small>
				</FormControl>
			</form>
		</div>
	);
};
