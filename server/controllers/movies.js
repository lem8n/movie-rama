const Movie = require("../db/models/movie");

const findAll = async (request, response) => {
  try {
    const page = request.query.page;
    const sortedBy = request.query.sortedBy;
    const sortedValue = request.query.sortedValue;
    let totalMovies = await Movie.count();

    if (!sortedBy) {
      return response.status(400).json({ message: "Missing params" });
    }

    if (sortedBy === "user" && sortedValue) {
      return response.status(400).json({ message: "Missing params" });
    }

    let movies;
    switch (sortedBy) {
      case "all":
        movies = await Movie.find()
          .skip((page - 1) * 10)
          .limit(10);
        break;
      case "user":
        totalMovies = await Movie.count({ "postedBy._id": sortedValue });
        movies = await Movie.find({ "postedBy._id": sortedValue })
          .skip((page - 1) * 10)
          .limit(10);
        break;
      case "dateAdded":
        movies = await Movie.find()
          .sort({ createdAt: -1 })
          .skip((page - 1) * 10)
          .limit(10);
        break;
      case "likes":
        movies = await Movie.aggregate([
          { $addFields: { likesCount: { $size: "$likedBy" } } },
          { $sort: { likesCount: -1 } },
        ])
          .skip((page - 1) * 10)
          .limit(10);
        break;
      case "dislikes":
        movies = await Movie.aggregate([
          { $addFields: { dislikesCount: { $size: "$hatedBy" } } },
          { $sort: { dislikesCount: -1 } },
        ])
          .skip((page - 1) * 10)
          .limit(10);
        break;
    }

    response.json({
      movies,
      totalMovies: totalMovies,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error.message });
  }
};

const addNewMovie = async (request, response) => {
  const movieInput = request.body;
  let wrongBody = false;

  if (!movieInput) {
    return response.status(400).json({ message: "Missing params" });
  }

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

const deleteMovie = async (request, response) => {
  try {
    const movieId = request.params;
    if (!movieId) {
      return response.status(400).json({ message: "Missing params" });
    }
    const movieDeletion = await Movie.findOneAndDelete(request.params);
    response.json(movieDeletion);
  } catch (error) {
    console.log(error);
    response.status(404).json({ message: "User not found" });
  }
};

const updateMovie = async (request, response) => {
  const movieId = request.params;
  const updateValue = request.body;

  if (!movieId) {
    return response.status(400).json({ message: "Missing params" });
  }

  if (Object.keys(updateValue).length === 0) {
    response.status(400).json({ message: "Wrong body" });
    return;
  }

  try {
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
  deleteMovie,
};
