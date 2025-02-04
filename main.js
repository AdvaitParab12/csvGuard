#!/usr/bin/env node
import { intro, outro, log, spinner } from "@clack/prompts";
import chalk from "chalk";
import core from "./lib/core.js";
import prompt from "./lib/prompt.js";
import { readCSV, writeCSV } from "./lib/io.js";

const success = chalk.bold.blue;

async function main() {
  intro(`CSVGuard start your csv validation`);

  const {
    input,
    clean: cleanFile,
    errors: errorsFile,
    headers,
  } = await prompt();

  console.log(headers);

  // const s = spinner();

  log.success(input);
  log.success(cleanFile);
  log.success(errorsFile);

  // s.start("Reading the file");

  const csvData = readCSV(input);
  const [clean, errors] = core(csvData.body, headers);

  log.success(success("Validation rules complete"));

  // s.start("Creating new files");

  // Generate clean csv
  writeCSV(cleanFile, clean);
  log.success(success("Generated Clean file successfully"));

  // Generate report
  writeCSV(errorsFile, errors);
  log.success(success("Generated report successfully!"));

  // s.stop();
  outro("You're done!");
}

await main();
