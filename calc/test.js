"use strict";
exports.__esModule = true;
var calc_1 = require("./calc");
var expreion = process.argv[2];
if (!expreion) {
    console.log('a expreion required');
    process.exit(-1);
}
console.log(calc_1.calc(expreion));
