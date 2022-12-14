import { TextField, Button, FormControl, FormHelperText } from '@mui/material';
import '../logInForm/logInForm.css';
import { useEffect, useState } from 'react';
import { findAll, signUp } from '../../api/users';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const SignUpForm = () => {
	const navigate = useNavigate();
	const alert = useAlert();
	const [user, setUser] = useState({
		email: '',
		fullName: '',
		password: '',
	});
	const [allUsers, setAllUsers] = useState([{}]);
	const [duplicateEmail, setDuplicateEmail] = useState(false);
	const [isFieldEmpty, setIsFieldEmpty] = useState(true);

	useEffect(() => {
		// If allUsers is populated don't run it again
		findAll()
			.then((users) => {
				setAllUsers(users.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const duplicateCheck = (newUser) => {
		const duplicateEmailExists = allUsers.some(
			(user) => newUser.email === user.email
		);

		setDuplicateEmail(duplicateEmailExists);
	};

	// Provide handling on user's inputs
	const handleOnChange = (event, inputType) => {
		// Local variable to check for duplicates
		const userInput = {
			email: user.email,
			fullName: user.fullName,
			password: user.password,
		};

		switch (inputType) {
			case 'email':
				userInput.email = event.target.value;
				setUser({ ...user, email: event.target.value });
				break;
			case 'fullName':
				userInput.fullName = event.target.value;
				setUser({ ...user, fullName: event.target.value });
				break;
			case 'password':
				userInput.password = event.target.value;
				setUser({ ...user, password: event.target.value });
				break;
			default:
				break;
		}

		if (
			userInput.email !== '' &&
			userInput.password !== '' &&
			userInput.fullName !== ''
		) {
			setIsFieldEmpty(false);
		} else {
			setIsFieldEmpty(true);
		}

		if (inputType !== 'password') {
			duplicateCheck(userInput);
		}
	};

	// Sign up a new user
	const userSignUp = async () => {
		// Call the signUp API
		try {
			const usr = await signUp(user);
			if (usr) {
				alert.success('Signed up successfully', {
					timeout: 2000,
				});
				navigate('/log-in');
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
					userSignUp();
					event.preventDefault();
				}}
			>
				<FormControl>
					<h1 style={{ textAlign: 'center' }}>Sign Up</h1>
					<TextField
						id="fullName"
						color="warning"
						size="small"
						label="FullName"
						onChange={(evt) => handleOnChange(evt, 'fullName')}
						variant="outlined"
						required
					/>
					<TextField
						id="email"
						type="email"
						color="secondary"
						size="small"
						label="E-mail"
						onChange={(evt) => handleOnChange(evt, 'email')}
						variant="outlined"
						style={{ marginTop: '8px' }}
						required
					/>
					{duplicateEmail && (
						<FormHelperText error>Email already exists</FormHelperText>
					)}
					<TextField
						id="password"
						color="warning"
						type="password"
						size="small"
						label="Password"
						onChange={(evt) => handleOnChange(evt, 'password')}
						variant="outlined"
						style={{ marginTop: '8px' }}
						required
					/>
					<Button
						className="loginButton"
						type="submit"
						color="success"
						variant="contained"
						disabled={duplicateEmail || isFieldEmpty}
					>
						Sign Up
					</Button>
					<small
						style={{ fontSize: '11px', textAlign: 'center', marginTop: '3px' }}
					>
						If you already have an account{' '}
						<a href="/log-in" style={{ color: 'blue' }}>
							Sign In
						</a>
					</small>
				</FormControl>
			</form>
		</div>
	);
};

export { SignUpForm };
