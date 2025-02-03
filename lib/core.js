import * as v from "./validate.js";

export default function validateAndClean(records, headers) {
  const clean = [];
  const errors = [];
  const companies = new Set();

  for (let record of records) {
    const recordError = [];
    // Validate company name
    if (!v.isCompanyName(record[headers.company])) {
      recordError.push("Company name is not valid");
    } else if (companies.has(record[headers.company])) {
      recordError.push("Company name is not unique");
    } else {
      companies.add(record[headers.company]);
    }

    // Validate linkedin url
    if (!v.isLinkedInURL(record["LinkedIn Profile URL"])) {
      recordError.push("LinkedIn url is not valid");
    }

    // Validate employee size
    if (!v.isEmployeeSize(record["Employee Size"])) {
      recordError.push("Employee size is not valid");
    }

    // Validate website url
    if (!v.isURL(record["Website URL"])) {
      recordError.push("Website URL is not valid");
    }

    if(!v.isLocation(record["Location"])){
      recordError.push("Location is not valid");
    }

    if (!recordError.length) {
      clean.push(record);
    } else {
      errors.push({ ...record, errors: recordError });
    }

    
  }

  return [clean, errors];
}
