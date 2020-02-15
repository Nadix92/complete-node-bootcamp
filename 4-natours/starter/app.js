// Third party modules
const express = require("express");
const morgan = require("morgan");

// Local modules
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Third party MiddleWares
app.use(morgan("dev"));
app.use(express.json()); // we need this to be able to read json from a request

// Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Listen on server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
