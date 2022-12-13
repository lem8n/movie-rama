import app from '../axiosConfig';

/** API Calls */

const findAll = async () => {
	try {
		return await app.get(`/users/findAll`);
	} catch (error) {
		console.log(error.message);
	}
};

const findById = async (userId) => {
	try {
		return await app.get(`/users/findById/${userId}`);
	} catch (error) {
		console.log(error);
	}
};

const signUp = async (user) => {
	try {
		return await app.post(`/users/signUp`, user);
	} catch (error) {
		console.log(error);
	}
};

const logIn = async (user) => {
	try {
		return await app.post(`/users/logIn`, user);
	} catch (error) {
		console.log(error);
	}
};

const logOut = async () => {
	try {
		return await app.get(`/users/logOut`);
	} catch (error) {
		console.log(error);
	}
};

const validateToken = async () => {
	try {
		return await app.get(`/users/validateToken`);
	} catch (error) {
		console.log(error);
	}
};

export { findAll, findById, signUp, logIn, logOut, validateToken };
