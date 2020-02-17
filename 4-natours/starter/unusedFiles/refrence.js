/*eslint-disable */

// Get ALL Routes
app.get("/api/v1/tours", getAllTours);

// to read the :id = we need req.params
app.get("/api/v1/tours/:id", getTour);

// Post routes
app.post("/api/v1/tours", postTour);

// put = replace whole document, patch = update only the parts that we define
app.patch("/api/v1/tours/:id", patchTour);

// Delete route
app.delete("/api/v1/tours/:id", deleteTour);

////////////////////////////////////////////////////

// Some test middleWare we made
app.use((req, res, next) => {
  console.log("Hello from the middleware :D");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//////////////////////////////////////////////////

// Make and save a testTour
const testTour = new Tour({
  name: "The Outdoor Camper",
  rating: 4.7,
  price: 297
});

testTour
  .save()
  .then(doc => console.log(doc))
  .catch(err => console.log("ERROR: ", err));

//////////////////////////////////////////////

// read and store file in a const | Will prob be replaced with a DB later on
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/////////////////////////////////////////////
// Checks
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price"
    });
  }
  next();
};
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }
  next();
};
router.param("id", tourController.checkID);

////////////////////////////////////////////

// Build Query
// 1a) Filtering
// const queryObj = { ...req.query };
// const excludedFields = ["page", "sort", "limit", "fields"]; // This gets ignored on our query
// excludedFields.forEach(el => delete queryObj[el]);

// // 2b) Advanced filtering
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
// let query = Tour.find(JSON.parse(queryStr)); // If we await this we don't get the result

// 2) Sorting
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(",").join(" ");
//   query = query.sort(sortBy);
// } else {
//   query = query.sort("-createdAt"); // default sort is created at
// }

// 3) Field limiting
// if (req.query.fields) {
//   const fields = req.query.fields.split(",").join(" ");
//   query = query.select(fields);
// } else {
//   query = query.select("-__v");
// }

// 4) Pagination
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;
// query = query.skip(skip).limit(limit);
// if (req.query.page) {
//   const numTours = await Tour.countDocuments();
//   if (skip >= numTours) throw new Error("This page does not exist");
// }

/////////////////////////////////////////////////////////////////////
