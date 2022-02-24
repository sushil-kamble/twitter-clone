const express = require("express");
const morgan = require("morgan");

// Set up Global configuration access
require("dotenv").config();

const dbSetup = require("./db/dbSetup");
const userRoutes = require("./routes/user");
const tweetRoutes = require("./routes/tweet");
const followRoutes = require("./routes/follow");

const app = express();

dbSetup();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Body parser
app.use(morgan("dev")); // Logger
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// User routes
app.use("/user", userRoutes);

// Tweet routes
app.use("/tweet", tweetRoutes);

// Follow routes
app.use("/follow", followRoutes);

// 404
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
