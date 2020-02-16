const Tour = require("./../models/tourModel");

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

// Tours Handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success"
    // results: tours.length,
    // data: {
    //   tours // = tours: tours
    // }
  });
};
exports.getTour = (req, res) => {
  const id = +req.params.id;
  // const tour = tours.find(el => el.id === id); // check if the id we type is === to the id in our document

  // res.status(200).json({
  //   status: "success"
  //   data: {
  //     tour
  //   }
  // });
};
exports.createTour = (req, res) => {
  res.status(201).json({
    status: "success"
    // data: {
    //   tour: newTour
    // }
  });
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>"
    }
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null
  });
};
