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

app.use((req, res, next) => {
  console.log("Hello from the middleware :D");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
