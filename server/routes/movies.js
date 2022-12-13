const express = require("express");
const router = express.Router();
const { findAll, addNewMovie, updateMovie } = require("../controllers/movies");

const { authenticateRequest } = require("../authentication");

router.get("/findAll", findAll);
router.post("/addNew", authenticateRequest, addNewMovie);
router.put("/updateMovie/:_id", authenticateRequest, updateMovie);

module.exports = router;
