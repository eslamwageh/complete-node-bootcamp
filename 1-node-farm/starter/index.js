//core modules
const fs = require('fs');
const http = require('http');
const url = require('url');
//third party and our own modules
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

//////////////////////////////////////////////FILES
//blocking , sync way
// console.log("hola");
// const textin = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textin);

// const textout = `now we are writing into files ${textin}.\n created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textout);
// console.log("file created!");

// //non-blocking , async way
// fs.readFile("./txt/startt.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("there is error "); //as its name is start not startt
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("your file has been written");
//       });
//     });
//   });
// });
// //this is called callback hell and there are solutions to it bit later
// console.log("will read file"); //this appears before the data appears

//server
//we are reading them sync as we r in the top level so np
//if we are in the create server never use sync as blocking
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/templatecard.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); //moved here to read the file once not every time we request something
//and sync as it is easy to store the data into data constant
const dataObj = JSON.parse(data); //the coming data is a string so this will convert it from string to js

//using third party depends
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

//1- create the server
const server = http.createServer((req, res) => {
  //console.log(req);
  //console.log(req.url); //we will need the url module a bit later to parse params from the url
  //res.end("hello from the server!"); //this appears everytime we request anything from the server
  //const pathname = req.url;
  const { query, pathname } = url.parse(req.url, true);

  //overview page
  if (pathname == '/overview' || pathname == '/') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(' ');
    //after the prev it will have the edited array success
    console.log(cardsHtml);
    const output = tempOverview.replace('{%PRODUCTCARDS%}', cardsHtml);
    res.end(output);
  }
  //product page
  else if (pathname == '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    console.log(query);
    res.end(output);
  }
  //api page
  else if (pathname == '/api') {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data); //the coming data is a string so this will convert it from string to js (array)
    //console.log(productData);
    res.writeHead(200, { 'content-type': 'application/json' }); //this is important here as only images i noticed that
    res.end(data); //as it needs only string
    // });

    //not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html', //considered mata data
      'my-own-header': 'hola',
    }); //u shld write it before the res.end
    res.end('<h1>page not found</h1>');
  }
});

//2-start the server (start listening for the incoming requests to it)
server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000'); //this appears once the server starts
});
