import './movie-list-item.css';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { findById } from '../../../api/users';
import { updateMovie } from '../../../api/movies';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
const moment = require('moment');

export const MovieListItem = ({
	allMovies,
	setIsLoading,
	signedInUser,
	isLoggedIn,
}) => {
	const [moviesList, setMoviesList] = useState([{}]);
	const [likesPerMovie, setLikesPerMovie] = useState({});
	const [hasUserLikeIt, setHasUserLikeIt] = useState({});
	const [dislikesPerMovie, setDislikesPerMovie] = useState({});
	const [hasUserDislikeIt, setHasUserDislikeIt] = useState({});
	const calculateTimeAgoPosted = (movie, unitOfTime) => {
		const timePast = moment().diff(movie.createdAt, unitOfTime);
		if (timePast !== 0) {
			return `${timePast} ${unitOfTime} ago`;
		}
	};

	useEffect(() => {
		let likes = {};
		let dislikes = {};
		let userLikes = {};
		let userDislikes = {};
		allMovies.map((movie) => {
			likes = { ...likes, [movie.title]: movie.likedBy.length };
			dislikes = { ...dislikes, [movie.title]: movie.hatedBy.length };
			findById(movie.postedBy._id)
				.then((user) => {
					if (isLoggedIn) {
						userLikes[movie.title] = movie.likedBy.includes(signedInUser._id);
						userDislikes[movie.title] = movie.hatedBy.includes(
							signedInUser._id
						);
					}

					if (isLoggedIn && user.data._id === signedInUser._id) {
						movie.postedBy.fullName = 'You';
					} else {
						movie.postedBy.fullName = user.data.fullName;
					}
				})
				.catch((error) => {
					console.log(error);
				});
			const timeUnits = ['seconds', 'minutes', 'hours', 'days'];
			timeUnits.map((timeUnit) => {
				if (calculateTimeAgoPosted(movie, timeUnit)) {
					movie.timeAgoPosted = calculateTimeAgoPosted(movie, timeUnit);
				}
			});
		});
		setLikesPerMovie(likes);
		setDislikesPerMovie(dislikes);
		setHasUserLikeIt(userLikes);
		setHasUserDislikeIt(userDislikes);
		setIsLoading(true);
		setTimeout(() => {
			setMoviesList(allMovies);
			setIsLoading(false);
		}, 1000);
	}, [allMovies, moviesList, signedInUser._id, setIsLoading, isLoggedIn]);

	const handleLike = async (movie) => {
		if (!isLoggedIn) {
			return;
		}
		const movieId = movie._id;
		let likedBy = movie.likedBy;

		if (hasUserDislikeIt[movie.title]) {
			handleDislike(movie);
		}

		if (hasUserLikeIt[movie.title]) {
			const index = likedBy.indexOf(signedInUser._id);
			likedBy.splice(index, 1);
		} else {
			likedBy.push(signedInUser._id);
		}

		// setItUp for the looks
		setHasUserLikeIt({
			...hasUserLikeIt,
			[movie.title]: !hasUserLikeIt[movie.title],
		});

		try {
			const updatedMovie = await updateMovie(movieId, { likedBy });
			if (updatedMovie.data) {
				if (hasUserLikeIt[movie.title]) {
					setLikesPerMovie({
						...likesPerMovie,
						[movie.title]: likesPerMovie[movie.title] - 1,
					});
				} else {
					setLikesPerMovie({
						...likesPerMovie,
						[movie.title]: likesPerMovie[movie.title] + 1,
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDislike = async (movie) => {
		if (!isLoggedIn) {
			return;
		}
		const movieId = movie._id;
		let hatedBy = movie.hatedBy;

		if (hasUserLikeIt[movie.title]) {
			handleLike(movie);
		}

		if (hasUserDislikeIt[movie.title]) {
			const index = hatedBy.indexOf(signedInUser._id);
			hatedBy.splice(index, 1);
		} else {
			hatedBy.push(signedInUser._id);
		}

		// setItUp for the looks
		setHasUserDislikeIt({
			...hasUserDislikeIt,
			[movie.title]: !hasUserDislikeIt[movie.title],
		});

		try {
			const updatedMovie = await updateMovie(movieId, { hatedBy });
			if (updatedMovie.data) {
				if (hasUserDislikeIt[movie.title]) {
					setDislikesPerMovie({
						...dislikesPerMovie,
						[movie.title]: dislikesPerMovie[movie.title] - 1,
					});
				} else {
					setDislikesPerMovie({
						...dislikesPerMovie,
						[movie.title]: dislikesPerMovie[movie.title] + 1,
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{Object.keys(moviesList[0]).length > 0 &&
				moviesList.map((result, key) => (
					<div className="movie-item" key={key}>
						<Card className="movie-card">
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									className="movie-title"
								>
									{result.title}
								</Typography>
								<Typography
									variant="body2"
									color="#a00000"
									sx={{ marginBottom: '5px' }}
								>
									<span style={{ color: '#000000' }}>Posted by </span>
									{' ' + result.postedBy.fullName + ' ' + result.timeAgoPosted}
								</Typography>
								<Typography variant="body3" color="text.secondary">
									{result.description}
								</Typography>
							</CardContent>
							<CardActions className="card-buttons">
								<IconButton
									type="button"
									className={
										isLoggedIn
											? hasUserLikeIt[result.title]
												? 'activeLikeButton'
												: 'likeButton'
											: 'activeLikeButton'
									}
									onClick={() => handleLike(result)}
									disabled={!isLoggedIn}
								>
									<ThumbUp />
								</IconButton>
								<span className="likeDislikeCount">
									{likesPerMovie[result.title]}
								</span>
								<IconButton
									type="button"
									className={
										isLoggedIn
											? hasUserDislikeIt[result.title]
												? 'activeDislikeButton'
												: 'dislikeButton'
											: 'activeDislikeButton'
									}
									onClick={() => handleDislike(result)}
									disabled={!isLoggedIn}
								>
									<ThumbDown />
								</IconButton>
								<span className="likeDislikeCount">
									{dislikesPerMovie[result.title]}
								</span>
							</CardActions>
						</Card>
					</div>
				))}
		</>
	);
};
