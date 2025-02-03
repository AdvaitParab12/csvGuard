import validator from "validator";
import fetch from 'node-fetch';

// Checks for a valid email pattern
export const isEmail = (text) => {
  return validator.isEmail(text) || text === "NA" || text === "N/A";
};

// Checks for a URL pattern
export const isURL = (text) => {
  return validator.isURL(text);
};

// Checks for a URL with "linkedIn" in it
export const isLinkedInURL = (text) => {
  return validator.isURL(text) && text.includes("linkedin");
};

// Regex for employee size patterns
export const isEmployeeSize = (text) => {
  const employeeSizeRegex = /^(?:\d+(?:-\d+)?|\d+k\+?|\d+\+)$/i;

  return employeeSizeRegex.test(text);
};

// Checks if not a complete number or url
export const isCompanyName = (text) => {
  return (
    !validator.isNumeric(text) &&
    !validator.isURL(text) &&
    !isEmployeeSize(text)
  );
};

// Checks if there's no single alphabet
export const isPhoneNumber = (text) => {
  return !validator.matches(text, /[a-zA-Z]/);
};



export const isLocation = async (text) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json`);
  const data = await response.json();
  return data.length > 0; 
};