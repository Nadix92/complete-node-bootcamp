const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // option 1
  /* fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  }); */

  // option 2: Streams
  /* const readable = fs.createReadStream("test-file.txt");
  readable.on("data", chunk => {
    res.write(chunk);
  });
  readable.on("end", () => {
    res.end();
  });
  readable.on("error", err => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found!");
  }); */

  // Option 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(WriteableDestination)
});

server.listen(8000, () => console.log("server listening on http://localhost:8000"));
