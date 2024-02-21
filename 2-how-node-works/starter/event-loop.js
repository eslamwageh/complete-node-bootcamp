const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

//these two consoles wont appear in a particular order as they are not in an event loop(callback func)
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));
//they are not in the event loop so they dont follow our order of happening

fs.readFile("test-file.txt", "utf-8", (err, data) => {
  console.log("I/O finished");
  console.log("----------------");
  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));
  //this fking piece of shit i didnt understand np now
  process.nextTick(() => console.log("Process.nextTick"));
  //it is excuted before immediate as it has mor priority
  //immediate and next tick , their names should be swapped
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });

  //if we used crypto.pbkdf2sync it would block the excution of all of these timers
  //and they all would run after it even the next tick which would be worse

  //if we have the thread bool size equal 4 then we have same time for all of them
  //but if it changed to 1 everyone of them will excute one after another so it will take much time longer
  //If you're using windows, instead of setting it inside your javascript file, you have to set it before calling the script.
  //set UV_THREADPOOL_SIZE=1 & node event-loop.js
});

console.log("Hello from the top level code");
