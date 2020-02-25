// Third party modules
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

// Local modules
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();

app.set("view engine", "pug"); // set pug as view engine
app.set("views", path.join(__dirname, "views"));

// Third party MiddleWares

app.use(express.static(path.join(__dirname, "public")));

// Set Security HTTP Headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limits the api request from same user
const limiter = rateLimit({
  max: 100, // x request
  windowMs: 60 * 60 * 1000, // 1hr
  message: "Too many request from this IP, please try again in an hour!"
});
app.use("/api", limiter);

// body parser, to be able to read json from a request e.g  req.body
app.use(express.json({ limit: "10kb" })); // set max limit 10kb

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["duration", "ratingsAverage", "ratingsQuantity", "maxGroupSize", "difficulty", "price"]
  })
);

// Routes
app.get("/", (req, res) => {
  res.status(200).render("base", {
    tour: "The forest Hiker",
    user: "Ole"
  });
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

// Fail any routes that we don't specify above
app.all("*", (req, res, next) => {
  // if a argument is passed to next() express know it was an error and all other middleware will be skipped
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
