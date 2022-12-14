const { generateAccessToken } = require("../authentication");
const User = require("../db/models/user");

const findAll = async (request, response) => {
  try {
    const users = await User.find();
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const signUp = async (request, response) => {
  try {
    const userData = await User.find();
    const duplicateFound = userData.find(
      (user) => user.email === request.body.email
    );

    if (!duplicateFound) {
      const userCreation = await User.create(request.body);
      response.json(userCreation);
    } else {
      response.status(409).json({ error: "User already exists" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const findById = async (request, response) => {
  try {
    const userFind = await User.findOne(request.params);
    response.json(userFind);
  } catch (error) {
    response.status(404).json({ message: "User not found" });
  }
};

const logIn = async (request, response) => {
  const userInput = request.body;
  let wrongBody = false;
  let userData;
  let token;
  try {
    userData = await User.find();
  } catch (error) {
    console.log(error);
    response.status(404).json({ error: error.message });
  }

  Object.keys(userInput).forEach((key) => {
    if (key !== "email" && key !== "password") {
      wrongBody = true;
    }
  });

  if (wrongBody) {
    return response.status(400).json({ error: "Wrong body" });
  }

  if (!userInput.email || !userInput.password) {
    return response.status(404).json({ error: "Information missing" });
  }
  for (let user of userData) {
    if (
      user.email === userInput.email &&
      user.password === userInput.password
    ) {
      token = generateAccessToken(user);
      return response
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 14400000), // 4 hours
        })
        .json({ token, user });
    }
  }

  response.json({});
};

const logOut = (request, response) => {
  return response
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};

module.exports = {
  findAll,
  signUp,
  logOut,
  findById,
  logIn,
};
