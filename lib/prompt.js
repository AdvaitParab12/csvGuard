import { createRequire } from "module";
import { text, isCancel, cancel, select } from "@clack/prompts";
import { readCSV } from "./io.js";

const require = createRequire(import.meta.url);
const packageJSON = require("../package.json");

process.on("SIGINT", () => {
  console.log("Operation canceled by user.");
  process.exit(1);
});

// Handling CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv))
  .option("input", {
    alias: "i",
    type: "string",
    description: "What is the input file",
  })
  .option("output", {
    alias: "o",
    type: "string",
    description: "What will be the output file",
  })
  .option("errors", {
    alias: "e",
    type: "string",
    description: "What will be the errors file",
  })
  .help("h")
  .alias("h", "help")
  .version(packageJSON.version)
  .alias("v", "version")
  .parse();

export default async function () {
  let { input, clean, errors } = argv;

  let companyHeader,
    linkedinHeader,
    employeeSizeHeader,
    websiteHeader,
    email,
    location;
  //  Prompt if the values are not in CLI arguments
  if (!(input && clean && errors)) {
    input = await text({
      message: "What is your input file?",
      placeholder: "The csv file to read",

      validate(value) {
        if (!value.toLowerCase().endsWith(".csv"))
          return `Only csv files are supported!`;
      },
    });

    const { headers } = readCSV(input);

    companyHeader = await select({
      message: "Select the column for Company Name:",
      options: headers.map((header) => ({ value: header, label: header })),
    });
    console.log(companyHeader);

    linkedinHeader = await select({
      message: "Select the column for LinkedIn Profile URL:",
      options: headers.map((header) => ({ value: header, label: header })),
    });
    console.log(linkedinHeader);

    employeeSizeHeader = await select({
      message: "Select the column for Employee Size:",
      options: headers.map((header) => ({ value: header, label: header })),
    }); 
    console.log(employeeSizeHeader);

    websiteHeader = await select({
      message: "Select the column for Website URL:",
      options: headers.map((header) => ({ value: header, label: header })),
    });
    console.log(websiteHeader);

    email = await select({
      message: "Select the column for Website URL:",
      options: headers.map((header) => ({ value: header, label: header })),
    });
    console.log(email);

    location = await select({
      message: "Select the column for Location:",
      options: headers.map((header) => ({ value: header, label: header })),
    });

    clean = await text({
      message: "What will be the output file?",
      placeholder: "The output csv file",

      validate(value) {
        if (!value.toLowerCase().endsWith(".csv"))
          return `Only csv files are supported!`;
      },
    });

    errors = await text({
      message: "What will be the errors file?",
      placeholder: "The csv file for errors",

      validate(value) {
        if (!value.toLowerCase().endsWith(".csv"))
          return `Only csv files are supported!`;
      },
    });

    if (isCancel(input) || isCancel(clean) || isCancel(errors)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }
  }
  // if (!companyHeader) companyHeader = "Company Name"; // Set default or handle missing
  // if (!linkedinHeader) linkedinHeader = "LinkedIn URL";
  // if (!employeeSizeHeader) employeeSizeHeader = "Employee Size";
  // if (!websiteHeader) websiteHeader = "Website";
  // if (!email) email = "Email";
  // if (!location) location = "Location";
  return {
    input,
    clean,
    errors,
    headers: {
      company: companyHeader,
      linkedin: linkedinHeader,
      employeeSize: employeeSizeHeader,
      website: websiteHeader,
      email: email,
      location: location,
    },
  };
}
