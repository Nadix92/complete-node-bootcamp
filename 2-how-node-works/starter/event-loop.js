const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

// 2
setTimeout(() => console.log("Timer 1 finished"), 0);

// 3
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  // 5
  console.log("I/O finished");
  console.log("-------------");

  // 7
  setTimeout(() => console.log("Timer 2 finished"), 0);

  // 8
  setTimeout(() => console.log("Timer 3 finished"), 3000);

  // 6
  setImmediate(() => console.log("Immediate 2 finished"));

  // 4
  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

// 1
console.log("Hello from the top-level code");
