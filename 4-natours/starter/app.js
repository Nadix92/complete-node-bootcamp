// Third party modules
const express = require("express");
const morgan = require("morgan");

// Local modules
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Third party MiddleWares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // we need this to be able to read json from a request
app.use(express.static(`${__dirname}/public`)); // gives express access to the public folder

// Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Fail any routes that we don't specify above
app.all("*", (req, res, next) => {
  // if a argument is passed to next() express know it was an error and all other middleware will be skipped
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
