import './newMovieForm.css';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import { useState } from 'react';
import { addNewMovie } from '../../api/movies';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

export const NewMovieForm = ({
	fetchedMovies,
	signedInUser,
	totalMovieNumber,
	setIsNewMovie,
	setPage,
}) => {
	const navigate = useNavigate();
	const alert = useAlert();
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
		const duplicateTitleExists = fetchedMovies.some(
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
				const newTotalMovieNumber = totalMovieNumber + 1;
				setPage(Math.ceil(newTotalMovieNumber / 10));
				setIsNewMovie(true);
				alert.success(`${movie.title} successfully added`, {
					timeout: 2000,
				});
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
					{duplicateTitle && (
						<FormHelperText error>This Movie already exists</FormHelperText>
					)}
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
						disabled={isFieldEmpty || duplicateTitle}
					>
						Submit new movie
					</Button>
				</FormControl>
			</form>
		</div>
	);
};
