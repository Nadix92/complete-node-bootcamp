const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

/////////////////////////
// ##### Server ##### //
///////////////////////

// read the file and get the data from it

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data); // Converts the json data to js object

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // /, /overview
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // /product
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // /api
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // no page found error
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "i-wrote-my-own-header"
    });
    res.end("<h1>This path not found!</h1>");
  }
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
