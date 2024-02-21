// console.log(arguments);
// console.log(require("module").wrapper);
//that proved that we are wrapped now in a function

//module.exports = function
const C = require("./test-module-1");
const calc1 = new C();

console.log(calc1.add(2, 5));

//exports
//const calc2 = require("./test-module-2");
//console.log(calc2.add(2, 5));
const { add, multiply, divide } = require("./test-module-2");
console.log(add(2, 5));

//caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
//the internal code in the module excuted once
//then the exports takes the place every time of call try it gg
