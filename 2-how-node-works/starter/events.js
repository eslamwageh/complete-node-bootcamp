const EventEmitter = require("events");
const http = require("http");
//const myEmitter = new EventEmitter();

//custom event that we build our own but we often use the built in eventemitters like http and so on
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();
//this is how http and fs are implemented internally they all inherit the eventemitter class

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Jonas");
});
//these on are the observers that waits for an emit to be excuted

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 9);

/////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url);
  console.log("Request received");
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another Request received");
});

server.on("close", (req, res) => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000"); //this appears once the server starts
});
