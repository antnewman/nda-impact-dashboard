/**
 * Data Loader Utility
 * Orchestrates loading, parsing, validating, and transforming survey data
 */

import { parseSurveyResponses } from './excelParser.js';
import { generateValidationReport } from './dataValidator.js';
import { transformSurveyData, enrichResponses } from './surveyDataTransformer.js';

/**
 * Load and process survey data from Excel file
 * @param {string} filePath - Path to Excel file
 * @param {Object} options - Options for data loading
 * @returns {Promise<Object>} Processed data with validation report
 */
export async function loadSurveyData(filePath, options = {}) {
  const {
    validate = true,
    enrich = true,
    throwOnValidationError = false,
  } = options;

  try {
    console.log('Loading survey data from:', filePath);

    // Step 1: Parse Excel file
    const rawResponses = await parseSurveyResponses(filePath);
    console.log(`Parsed ${rawResponses.length} responses`);

    // Step 2: Validate (optional)
    let validationReport = null;
    if (validate) {
      validationReport = generateValidationReport(rawResponses);
      console.log(
        `Validation: ${validationReport.isValid ? 'PASSED' : 'FAILED'}`
      );

      if (!validationReport.isValid && throwOnValidationError) {
        throw new Error(
          `Data validation failed: ${validationReport.schema.errors.join(', ')}`
        );
      }
    }

    // Step 3: Transform to dashboard format
    let transformedResponses = transformSurveyData(rawResponses);
    console.log(`Transformed ${transformedResponses.length} responses`);

    // Step 4: Enrich with calculated fields (optional)
    if (enrich) {
      transformedResponses = enrichResponses(transformedResponses);
      console.log('Enriched responses with calculated fields');
    }

    return {
      success: true,
      data: transformedResponses,
      rawData: rawResponses,
      validationReport,
      meta: {
        totalResponses: transformedResponses.length,
        loadedAt: new Date().toISOString(),
        filePath,
      },
    };
  } catch (error) {
    console.error('Error loading survey data:', error);
    return {
      success: false,
      data: [],
      rawData: [],
      error: error.message,
      validationReport: null,
    };
  }
}

/**
 * Load survey data for browser environment (using public path)
 * @param {string} fileName - Name of Excel file in /data folder
 * @param {Object} options - Options for data loading
 * @returns {Promise<Object>} Processed data
 */
export async function loadSurveyDataFromPublic(fileName, options = {}) {
  // In browser, we need to fetch the file from the public directory
  // For now, this will load from the data directory using a relative path
  const filePath = `/data/${fileName}`;

  // Note: In a browser environment, we can't directly access file system
  // We'll need to fetch the file as a blob and then parse it
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    // Import XLSX here for browser use
    const XLSX = await import('xlsx');
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawResponses = XLSX.utils.sheet_to_json(firstSheet);

    // Process dates
    const processedResponses = rawResponses.map((response, index) => {
      const dateFields = [
        'Timestamp',
        'StartDate',
        'EndDate',
        'FormalDate',
        'InformalDate',
      ];

      const processed = { ...response };
      dateFields.forEach((field) => {
        if (processed[field] && typeof processed[field] === 'number') {
          // Convert Excel serial date to JS Date
          const utc_days = Math.floor(processed[field] - 25569);
          const utc_value = utc_days * 86400;
          const date_info = new Date(utc_value * 1000);
          processed[field] = new Date(
            date_info.getFullYear(),
            date_info.getMonth(),
            date_info.getDate()
          );
        }
      });

      if (!processed.id) {
        processed.id = `response_${index + 1}`;
      }

      return processed;
    });

    // Transform and enrich
    let transformedResponses = transformSurveyData(processedResponses);

    if (options.enrich !== false) {
      transformedResponses = enrichResponses(transformedResponses);
    }

    console.log(
      `Successfully loaded ${transformedResponses.length} responses from ${fileName}`
    );

    return {
      success: true,
      data: transformedResponses,
      rawData: processedResponses,
      meta: {
        totalResponses: transformedResponses.length,
        loadedAt: new Date().toISOString(),
        fileName,
      },
    };
  } catch (error) {
    console.error('Error loading data from public directory:', error);
    return {
      success: false,
      data: [],
      rawData: [],
      error: error.message,
    };
  }
}

/**
 * Merge multiple survey datasets
 * @param {Array<Array>} datasets - Array of response arrays to merge
 * @returns {Array} Merged and deduplicated responses
 */
export function mergeSurveyDatasets(datasets) {
  const merged = [];
  const seenIds = new Set();

  datasets.forEach((dataset) => {
    dataset.forEach((response) => {
      if (!seenIds.has(response.id)) {
        merged.push(response);
        seenIds.add(response.id);
      }
    });
  });

  console.log(`Merged ${datasets.length} datasets into ${merged.length} unique responses`);
  return merged;
}

export default {
  loadSurveyData,
  loadSurveyDataFromPublic,
  mergeSurveyDatasets,
};
