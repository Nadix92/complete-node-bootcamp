const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // file to read, language

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut); // What file to write, what we want to write
console.log("File written!");
