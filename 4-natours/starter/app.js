const express = require("express");

const app = express();

// ######### Middleware ######### //

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server side!", app: "Natours" });
});

app.post("/", (req, res) => {
  res.send("You can post to this endpoint...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
