// Handling CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

// Reading CLI Arguments
const inputFile = argv.input;
const outputFile = argv.clean;
const reportFile = argv.report;

function validateData(data){
  
}