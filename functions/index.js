require("regenerator-runtime/runtime");
const functions = require("firebase-functions");
const builtFunctions = require("./build");

Object.keys(builtFunctions).forEach((functioName) => {
  exports[functioName] = builtFunctions[functioName];
});
