import './nav-bar.css';
import { Button, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import { logOut } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

export const NavBar = ({
	isLoggedIn,
	setIsLoggedIn,
	signedInUser,
	setSignedInUser,
	setIsLoading,
	setSortedBy,
	setSortedValue,
	page,
	setPage,
}) => {
	const navigate = useNavigate();
	const alert = useAlert();
	const userLogOut = async () => {
		const loggedOut = await logOut();
		if (loggedOut) {
			setIsLoggedIn(false);
			setIsLoading(true);
			setSignedInUser({});
		}

		alert.success('Logged Out', {
			timeout: 2000,
		});
		navigate('/');
	};

	const getMovies = async () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		if (page !== 1) {
			setPage(1);
		}
		setSortedBy('all');
	};

	return (
		<AppBar position="static">
			<Toolbar className="navbar">
				<IconButton
					onClick={() => {
						getMovies();
						navigate('/');
					}}
					className="logoButton"
				>
					<img className="logo" src={`/assets/logo.png`} alt="logo" />
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
							Welcome Back{' '}
							<a
								className="user"
								onClick={() => {
									window.scrollTo({ top: 0, behavior: 'smooth' });
									if (page !== 1) {
										setPage(1);
									}
									setSortedBy('user');
									setSortedValue(signedInUser._id);
								}}
							>
								{signedInUser.fullName}
							</a>
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
