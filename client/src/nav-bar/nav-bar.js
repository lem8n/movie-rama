import './nav-bar.css';
import { Button, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import { logOut } from '../api/users';
import { useNavigate } from 'react-router-dom';

export const NavBar = ({
	isLoggedIn,
	setIsLoggedIn,
	signedInUser,
	setSignedInUser,
	setIsLoading,
}) => {
	const navigate = useNavigate();
	const userLogOut = async () => {
		const loggedOut = await logOut();
		if (loggedOut) {
			setIsLoggedIn(false);
			setIsLoading(true);
			setSignedInUser({});
		}

		alert('User logged out');
		navigate('/');
	};

	return (
		<AppBar position="static">
			<Toolbar className="navbar">
				<IconButton
					onClick={() => {
						navigate('/');
					}}
					className="logoButton"
				>
					<img className="logo" src={`/assets/logo.png`} />
				</IconButton>
				{!isLoggedIn ? (
					<div>
						<Button className="navButton" onClick={() => navigate(`/log-in`)}>
							LogIn
						</Button>
						<Button className="navButton" onClick={() => navigate(`/sign-up`)}>
							SignUp
						</Button>
					</div>
				) : (
					<div>
						<small
							style={{
								fontSize: '12px',
								color: '#a00000',
							}}
						>
							Welcome Back <a className="user">{signedInUser.fullName}</a>
						</small>
						<Button className="navLogOut" onClick={userLogOut}>
							LogOut
						</Button>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
};
