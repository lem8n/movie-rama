const express = require("express");
const router = express.Router();
const {
  findAll,
  addNewMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

const { authenticateRequest } = require("../authentication");

router.get("/findAll", findAll);
router.post("/addNew", authenticateRequest, addNewMovie);
router.delete("/deleteMovie/:_id", authenticateRequest, deleteMovie);
router.put("/updateMovie/:_id", authenticateRequest, updateMovie);

module.exports = router;
