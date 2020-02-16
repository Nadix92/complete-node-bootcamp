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
