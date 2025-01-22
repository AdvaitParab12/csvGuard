const yargs = require("yargs/yargs");
require('dotenv').config()
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

console.log(argv);
console.log(process.env.TOKEN);
