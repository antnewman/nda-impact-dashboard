/**
 * Excel Parser Utility
 * Reads survey data from Excel files and converts to usable format
 */

import * as XLSX from 'xlsx';

/**
 * Convert Excel serial date number to JavaScript Date
 * Excel dates are stored as days since 1900-01-01
 * @param {number} serial - Excel serial date number
 * @returns {Date} JavaScript Date object
 */
export function excelDateToJSDate(serial) {
  if (!serial || typeof serial !== 'number') return null;

  // Excel incorrectly treats 1900 as a leap year
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate()
  );
}

/**
 * Read Excel file and return parsed data
 * @param {string} filePath - Path to Excel file
 * @param {string} sheetName - Optional sheet name (defaults to first sheet)
 * @returns {Array<Object>} Array of row objects
 */
export async function readExcelFile(filePath, sheetName = null) {
  try {
    const workbook = XLSX.readFile(filePath);

    // Use specified sheet or first sheet
    const targetSheet = sheetName || workbook.SheetNames[0];

    if (!workbook.Sheets[targetSheet]) {
      throw new Error(`Sheet "${targetSheet}" not found in workbook`);
    }

    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[targetSheet]);

    return data;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw new Error(`Failed to read Excel file: ${error.message}`);
  }
}

/**
 * Read all sheets from an Excel file
 * @param {string} filePath - Path to Excel file
 * @returns {Object} Object with sheet names as keys and data arrays as values
 */
export async function readAllSheets(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const allData = {};

    workbook.SheetNames.forEach((sheetName) => {
      allData[sheetName] = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );
    });

    return allData;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw new Error(`Failed to read Excel file: ${error.message}`);
  }
}

/**
 * Get sheet names from an Excel file
 * @param {string} filePath - Path to Excel file
 * @returns {Array<string>} Array of sheet names
 */
export function getSheetNames(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    return workbook.SheetNames;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw new Error(`Failed to read Excel file: ${error.message}`);
  }
}

/**
 * Parse survey responses from Excel file
 * @param {string} filePath - Path to survey responses Excel file
 * @returns {Array<Object>} Parsed survey responses with converted dates
 */
export async function parseSurveyResponses(filePath) {
  const responses = await readExcelFile(filePath);

  // Convert Excel serial dates to JavaScript dates
  const dateFields = [
    'Timestamp',
    'StartDate',
    'EndDate',
    'FormalDate',
    'InformalDate',
  ];

  return responses.map((response, index) => {
    const parsed = { ...response };

    // Convert dates
    dateFields.forEach((field) => {
      if (parsed[field]) {
        parsed[field] = excelDateToJSDate(parsed[field]);
      }
    });

    // Add unique ID if not present
    if (!parsed.id) {
      parsed.id = `response_${index + 1}`;
    }

    return parsed;
  });
}

/**
 * Parse data mapping dictionary from Excel file
 * @param {string} filePath - Path to data mapping Excel file
 * @returns {Array<Object>} Parsed data dictionary
 */
export async function parseDataMapping(filePath) {
  try {
    const dictData = await readExcelFile(filePath, 'DICT');
    return dictData;
  } catch (error) {
    console.warn('DICT sheet not found in mapping file:', error.message);
    return [];
  }
}

/**
 * Get column metadata from mapping file
 * @param {string} filePath - Path to data mapping Excel file
 * @returns {Object} Map of column names to their metadata
 */
export async function getColumnMetadata(filePath) {
  const dictData = await parseDataMapping(filePath);
  const metadata = {};

  dictData.forEach((row) => {
    const columnName =
      row['Shortened Code (Raw data)'] || row['Full name'];
    if (columnName) {
      metadata[columnName] = {
        fullName: row['Full name'],
        shortCode: row['Shortened Code (Raw data)'],
        question: row['Question'],
        dataType: row['Data type'],
        section: row['Survey Section'],
        excelColumn: row['Column'],
        hasMappings: row['Data mapped in this workbook?'],
      };
    }
  });

  return metadata;
}

export default {
  readExcelFile,
  readAllSheets,
  getSheetNames,
  parseSurveyResponses,
  parseDataMapping,
  getColumnMetadata,
  excelDateToJSDate,
};
