const fs = require("fs");
const Papa = require("papaparse");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).argv;

// Get input, output files from cli arguments
const inputFile = argv.input;
const outputFile = argv.clean;
const reportFile = argv.report;

// Function to read from the csv file
function readCSV(file) {
  const fileContent = fs.readFileSync(file, "utf-8");
  const records = Papa.parse(fileContent, {
    header: true,
  });
  const headers = records.meta.fields;
  const body = records.data;

  return { headers, body };
}

function writeCSV(path, data) {
  const first = data[0];
  first["Errors"] = "No such error";
  data[0] = first;
  // const newData = data.unshift({ ...first, errors: "This is an error" });
  const stringify = Papa.unparse(data);
  console.log(stringify);
  fs.writeFileSync(path, stringify);
}

writeCSV(outputFile, readCSV(inputFile).body);