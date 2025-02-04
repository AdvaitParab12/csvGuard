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

  // Prompt if the values are not in CLI arguments
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
    console.log(headers); // Check the available headers in the CSV

    // Dynamically generate prompts for available headers
    if (headers.includes("Company Name")) {
      companyHeader = await select({
        message: "Select the column for Company Name:",
        options: headers.map((header) => ({ value: header, label: header })),
      });
    }

    if (headers.includes("LinkedIn Profile URL")) {
      linkedinHeader = await select({
        message: "Select the column for LinkedIn Profile URL:",
        options: headers.map((header) => ({ value: header, label: header })),
      });
    }

    if (headers.includes("Employee Size")) {
      employeeSizeHeader = await select({
        message: "Select the column for Employee Size:",
        options: headers.map((header) => ({ value: header, label: header })),
      });
    }

    if (headers.includes("Website URL")) {
      websiteHeader = await select({
        message: "Select the column for Website URL:",
        options: headers.map((header) => ({ value: header, label: header })),
      });
    }

    // Only prompt for email if the column exists
    if (headers.includes("Email")) {
      email = await select({
        message: "Select the column for Email:",
        options: headers.map((header) => ({ value: header, label: header })),
      });
    }

    // Only prompt for location if the column exists
    if (headers.includes("Location")) {
      location = await select({
        message: "Select the column for Location:",
        options: headers.map((header) => ({ value: header, label: header })),
      });
    }

    console.log(
      "Headers selected:",
      companyHeader,
      linkedinHeader,
      employeeSizeHeader,
      websiteHeader,
      email,
      location
    );

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

  // Ensure email and location are checked only if they are selected
  if (email === undefined || location === undefined) {
    // Log warnings if those fields are missing
    if (email === undefined) console.warn("Email column not selected.");
    if (location === undefined) console.warn("Location column not selected.");
  }

  return {
    input,
    clean,
    errors,
    headers: {
      company: companyHeader,
      linkedin: linkedinHeader,
      employeeSize: employeeSizeHeader,
      website: websiteHeader,
      email: email || null,
      location: location || null,
    },
  };
}
