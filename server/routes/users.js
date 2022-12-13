const express = require("express");
const router = express.Router();
const {
  findAll,
  signUp,
  logOut,
  findById,
  updateUser,
  logIn,
} = require("../controllers/users");

const { authenticateRequest, validateToken } = require("../authentication");

router.post("/logIn", logIn);
router.get("/logOut", authenticateRequest, logOut);
router.put("/updateUser", authenticateRequest, updateUser);
router.get("/validateToken", validateToken);
router.get("/findAll", findAll);
router.post("/signUp", signUp);
router.get("/findById/:_id", findById);

module.exports = router;
