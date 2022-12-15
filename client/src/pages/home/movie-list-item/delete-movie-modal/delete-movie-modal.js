import './delete-movie-modal.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@mui/material';
import { deleteMovie } from '../../../../api/movies';

export const DeleteMovieModal = ({
	openDeleteModal,
	setOpenDeleteModal,
	movieToDelete,
	setPage,
	setIsNewMovie,
	totalMovieNumber,
}) => {
	const handleClose = () => {
		setOpenDeleteModal(false);
	};

	const handleMovieDelete = async () => {
		const movieDeletion = await deleteMovie(movieToDelete);
		if (movieDeletion) {
			const newTotalMovieNumber = totalMovieNumber - 1;
			if (newTotalMovieNumber === 0) {
				setPage(1);
			} else {
				setPage(Math.ceil(newTotalMovieNumber / 10));
			}
			setIsNewMovie(true); // does the work of updating state, no need to add new one
			alert.success(`Movie successfully deleted`, {
				timeout: 2000,
			});
		}
	};

	return (
		<div>
			<Dialog
				open={openDeleteModal}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Are you sure you want to delete this movie?
				</DialogTitle>
				<DialogActions>
					<Button
						onClick={() => {
							handleMovieDelete();
							handleClose();
						}}
						className="yesButton"
					>
						Yes
					</Button>
					<Button onClick={handleClose} className="noButton" autoFocus>
						No
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
