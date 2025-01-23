const fs = require("fs");
const { parse } = require("csv-parse/sync");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).argv;

// Get input, output files from cli arguments
const inputFile = argv.input;
const outputFile = argv.output;

// Function to read from the csv file
function readCsv(file) {
  const fileContent = fs.readFileSync(file, "utf-8");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
}

const records = readCsv(inputFile);
// console.log();
console.log(Object.keys(records[0]));
function validateHeaders(validHeaders) {
  const headers = Object.keys(records[0]);

  if (headers.length !== validHeaders.length) {
    console.log("Invalid headers");
    return false;
  }

  let clean = true;
  headers.forEach((header) => {
    if (!validHeaders.includes(header)) {
      console.log("Invalid header");
      clean = false;
      return;
    }
  });

  return clean;
}

console.log(
  validateHeaders([
    "Company Name",
    "LinkedIn Profile URL",
    "Employee Size",
    "Website URL",
  ])
);