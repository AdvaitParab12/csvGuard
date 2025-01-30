import { readFileSync, writeFileSync } from "fs";
import Papa from "papaparse";

export function readCSV(file) {
  try {
    const fileContent = readFileSync(file, "utf8");
    const records = Papa.parse(fileContent, {
      header: true,
    });
    const headers = records.meta.fields;
    const body = records.data;
    return { headers, body };
  } catch (err) {
    console.log("Error occured while reading the file");
    process.exit(1);
  }
}

export function writeCSV(path, data) {
  try {
    console.log("inside try");
    const stringify = Papa.unparse(data);
    writeFileSync(path, stringify);

    console.log("File written successfully");
  } catch (err) {
    console.log("Error occured while writing the csv");
    process.exit(1);
  }
}
