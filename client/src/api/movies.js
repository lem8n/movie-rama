import app from '../axiosConfig';

/** API Calls */

const findAll = async () => {
	try {
		return await app.get(`/movies/findAll`);
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

export { findAll, addNewMovie, updateMovie };
