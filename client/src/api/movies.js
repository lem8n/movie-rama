import app from '../utils/axiosConfig';

/** API Calls */

const findAll = async (page, sortedBy, sortedValue) => {
	try {
		const findAllResponse = await app.get(
			`/movies/findAll?page=${page}&sortedBy=${sortedBy}&sortedValue=${sortedValue}`
		);
		return {
			movies: findAllResponse.data.movies,
			totalMovies: findAllResponse.data.totalMovies,
		};
	} catch (error) {
		console.log(error.message);
	}
};

const addNewMovie = async (movie) => {
	return await app.post(`/movies/addNew`, movie);
};

const updateMovie = async (movieId, updatedValues) => {
	return await app.put(`/movies/updateMovie/${movieId}`, updatedValues);
};

const deleteMovie = async (movieId) => {
	return await app.delete(`/movies/deleteMovie/${movieId}`);
};

export { findAll, addNewMovie, updateMovie, deleteMovie };
