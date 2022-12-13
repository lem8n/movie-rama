import './newMovieForm.css';
import { Button, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { addNewMovie } from '../../api/movies';
import { useNavigate } from 'react-router-dom';

export const NewMovieForm = ({
	allMovies,
	signedInUser,
	setIsLoading,
	setAllMovies,
}) => {
	const navigate = useNavigate();
	const [isFieldEmpty, setIsFieldEmpty] = useState(true);
	const [movie, setMovie] = useState({
		title: '',
		description: '',
		postedBy: {
			_id: signedInUser._id,
			fullName: signedInUser.fullName,
		},
	});
	const [duplicateTitle, setDuplicateTitle] = useState(false);

	const duplicateCheck = (newMovie) => {
		const duplicateTitleExists = allMovies.some(
			(movie) => movie.title === newMovie.title
		);

		setDuplicateTitle(duplicateTitleExists);
	};

	const handleOnChange = (evt, inputType) => {
		const movieInput = {
			title: movie.title,
			description: movie.description,
		};

		switch (inputType) {
			case 'title':
				movieInput.title = evt.target.value;
				setMovie({ ...movie, title: evt.target.value });
				break;
			case 'description':
				movieInput.description = evt.target.value;
				setMovie({ ...movie, description: evt.target.value });
				break;
			default:
				break;
		}

		if (movieInput.title !== '' && movieInput.description !== '') {
			setIsFieldEmpty(false);
		} else {
			setIsFieldEmpty(true);
		}

		if (inputType === 'title') {
			duplicateCheck(movieInput);
		}
	};

	const submitMovie = async () => {
		try {
			const mve = await addNewMovie(movie);
			if (mve) {
				alert('Sign Up Success');
				setAllMovies([...allMovies, mve.data]);
				setIsLoading(true);
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="newMovieBox">
			<form
				onSubmit={(event) => {
					submitMovie();
					navigate('/');
					event.preventDefault();
				}}
			>
				<FormControl className="newMovieInput">
					<h1 style={{ textAlign: 'center' }}>Add a new movie</h1>
					<TextField
						id="title"
						color="secondary"
						size="small"
						label="Title"
						onChange={(evt) => handleOnChange(evt, 'title')}
						variant="outlined"
						required
					/>
					<TextField
						id="description"
						color="warning"
						multiline
						size="small"
						label="Description"
						onChange={(evt) => handleOnChange(evt, 'description')}
						variant="outlined"
						required
						style={{ marginTop: '8px' }}
					/>
					<Button
						type="submit"
						color="success"
						variant="contained"
						style={{ marginTop: '10px' }}
						disabled={isFieldEmpty}
					>
						Submit new movie
					</Button>
				</FormControl>
			</form>
		</div>
	);
};
