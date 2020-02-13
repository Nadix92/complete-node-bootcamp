const fs = require("fs");
const http = require("http");
const url = require("url");

// Server
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "i-wrote-my-own-header"
    });
    res.end("<h1>This path not found!</h1>");
  }

  res.end("This is the responds from the server");
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server Listening on http://localhost:${PORT}`));

////////////////////////////////////
// ######### FILES ############# //
//////////////////////////////////

// Blocking, synchronous way
/* const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // file to read, language
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut); // What file to write, what we want to write
console.log("File written!"); */

// Non-blocking, asynchronous way
// where the file is located, callback
// Normal its (err, data, res)  in this order
/* fs.readFile(`./txt/start.txt`, "utf-8", (err, data1) => {
  if (err) return console.log(err);

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);

    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", (err, data2) => {
        console.log("Your file has ben written");
      });
    });
  });
});

console.log("Will read file!"); */
