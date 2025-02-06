# CSVGuard

A robust CSV validation tool designed specifically for LinkedIn lead data. CSVGuard automatically detects CSV headers and allows you to define validation rules for each field, ensuring your lead data meets your quality standards.

## Features

- Automatic header detection for CSV files
- Configurable validation rules for common lead data fields:
  - Company names
  - Locations
  - Phone numbers
  - Email addresses
  - Employee size counts
  - Company Webite URLs
  - LinkedIn Profile URLs

- Generates two output files:
  - clean.csv: Contains all valid records
  - report.csv: Contains invalid records with detailed error descriptions

## Installation

```bash
npm install -g csvguard
```

## Quick Start

The fastest way to validate your leads file is using npx:

```bash
npx csvguard path/to/your/file.csv
```

This will start an interactive session where you can:

1. Review detected headers
2. Run the validation process
3. Get your clean.csv and reportcsv files

## Validation Rules

CSVGuard supports the following validation types:

- `company`: Validates company names
- `email`: Validates email addresses
- `phone`: Validates phone numbers (international format supported)
- `location`: Validates geographical locations
- `employee_size`: Validates employee count numbers
- `url`: Validates URLs
- `date`: Validates dates in various formats

## Output Files

### clean.csv

Contains all records that passed validation, maintaining the original format.

### report.csv

Contains records that failed validation, with an additional column for errors describing what went wrong.

## License

MIT


