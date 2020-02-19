// Third party modules
const express = require("express");
const morgan = require("morgan");

// Local modules
const userRouter = require("./routes/userRoutes");
// const tourRouter = require("./routes/tourRoutes");

const app = express();

// Third party MiddleWares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // we need this to be able to read json from a request
app.use(express.static(`${__dirname}/public`)); // gives express access to the public folder

// Routes
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/tours", tourRouter);

// module.exports = app;
