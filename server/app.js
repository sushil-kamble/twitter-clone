const express = require("express");
const morgan = require("morgan");
const dbSetup = require("./db/dbSetup");
const userRoutes = require("./routes/user");
const tweetRoutes = require("./routes/tweet");

const app = express();

dbSetup();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Body parser
app.use(morgan("dev")); // Logger

// User routes
app.use("/user", userRoutes);

// Tweet routes
app.use("/tweet", tweetRoutes);

// 404
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
