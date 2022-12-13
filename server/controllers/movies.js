const Movie = require("../db/models/movie");

const findAll = async (request, response) => {
  try {
    const movies = await Movie.find();
    response.json(movies);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const addNewMovie = async (request, response) => {
  const movieInput = request.body;
  let wrongBody = false;
  try {
    const moviesData = await Movie.find();
    const duplicateFound = moviesData.find(
      (movie) => movie.title === movieInput.title
    );

    Object.keys(movieInput).forEach((key) => {
      if (key !== "title" && key !== "description" && key !== "postedBy") {
        wrongBody = true;
      }
    });

    if (wrongBody) {
      return response.status(400).json({ error: "Wrong Body" });
    }

    if (!movieInput.title || !movieInput.description) {
      return response.status(404).json({ error: "Information missing" });
    }

    if (!duplicateFound) {
      const movieCreation = await Movie.create(movieInput);
      return response.json(movieCreation);
    } else {
      return response.status(409).json({ error: "Movie already exists" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};

// const findById = async (request, response) => {
//   try {
//     const userFind = await User.findOne(request.params);
//     response.json(userFind);
//   } catch (error) {
//     response.status(404).json({ message: "User not found" });
//   }
// };

const updateMovie = async (request, response) => {
  const movieId = request.params;
  const updateValue = request.body;

  try {
    if (Object.keys(updateValue).length === 0) {
      response.status(400).json({ message: "Wrong body" });
      return;
    }

    const updatedMovie = await Movie.findOneAndUpdate(movieId, updateValue, {
      new: true,
    });
    response.json(updatedMovie);
  } catch (error) {
    console.log(error);
    response.status(400).json({ message: "Movie didn't update" });
  }
};

module.exports = {
  findAll,
  addNewMovie,
  updateMovie,
};
