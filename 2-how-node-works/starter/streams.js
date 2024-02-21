const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //solution 1 simplestway but when it is big there is a big problems and may crash when users are many
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //solution 2 we take chunks and once we have one chunk we sent it to the user as response
  //but there is a big problem in this way which is backpressure
  //and it means that the response cant send the data nearly as fast it is recieving it
  //so it is overwhelmed    msh la72 y3ne by read bsor3a f45
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //     //as the response is a writable stream , so we can write every piece of data in it once we get it
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //     //now this end is reasonable name and we need it here neccessary for the response to be completed
  //   });
  //   readable.on("error", (err) => {
  //     //if we didnt find the file typo for example
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });
  //solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res); //to handle the speed bet read and write
  //readablesource.pipe(writabledest);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
