// Imports
require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const mongoose = require("mongoose");

// MongoDB configuration
const dbConnectionString = process.env.DB_URL;
mongoose.connect(dbConnectionString);
const db = mongoose.connection;

// Mongo error in connection
db.on("error", (error) => {
  console.log(error);
});

// Mongo successful connection
db.once("connected", () => {
  console.log("Database Connected");
});

// Start local server
const app = express();
app.use(express.json());
app.use(cookieParser());

// Api routes
app.use("/api", cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/api", routes);

// Specify server port
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
