const EventEmitter = require("events");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request received");
});

server.on("request", (req, res) => {
  res.end("Another Request received ");
});

server.on("close", () => {
  console.log("Server close");
});

server.listen(8000, () => console.log("Waiting for request... at http://localhost:8000"));

///////////////

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

// Storing variable
const myEmitter = new Sales();

// This listen for a new sale
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});
// This listen for a new sale
myEmitter.on("newSale", () => {
  console.log("Customer name: Ole");
});

myEmitter.on("newSale", stock => {
  console.log(`There are now ${stock} items left in stock.`);
});

// this trigger a new sale
myEmitter.emit("newSale", 9);
