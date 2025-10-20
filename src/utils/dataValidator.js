/**
 * Data Validation Utility
 * Validates survey data structure and quality
 */

import { SURVEY_CONFIG } from '../config/surveyConfig.js';

/**
 * Validate Excel file schema
 * @param {Array<Object>} data - Parsed survey responses
 * @returns {Object} Validation result with errors and warnings
 */
export function validateSchema(data) {
  const errors = [];
  const warnings = [];

  // Check if data exists
  if (!data || !Array.isArray(data)) {
    errors.push('Invalid data: Expected an array of survey responses');
    return { isValid: false, errors, warnings };
  }

  // Check response count
  if (data.length < SURVEY_CONFIG.validation.minResponses) {
    errors.push(
      `Too few responses: ${data.length} (minimum: ${SURVEY_CONFIG.validation.minResponses})`
    );
  }

  if (data.length > SURVEY_CONFIG.validation.maxResponses) {
    warnings.push(
      `Large dataset: ${data.length} responses (maximum expected: ${SURVEY_CONFIG.validation.maxResponses})`
    );
  }

  // Check if data has any rows
  if (data.length === 0) {
    errors.push('No data rows found in Excel file');
    return { isValid: false, errors, warnings };
  }

  // Check required columns
  const firstRow = data[0];
  const actualColumns = Object.keys(firstRow);

  SURVEY_CONFIG.requiredColumns.forEach((col) => {
    if (!actualColumns.includes(col)) {
      errors.push(`Missing required column: ${col}`);
    }
  });

  // Check column count
  if (actualColumns.length !== SURVEY_CONFIG.validation.expectedColumnCount) {
    warnings.push(
      `Column count mismatch: Found ${actualColumns.length} columns, expected ${SURVEY_CONFIG.validation.expectedColumnCount}`
    );
  }

  // Check multi-select groups
  Object.entries(SURVEY_CONFIG.multiSelectGroups).forEach(
    ([groupName, config]) => {
      const groupColumns = actualColumns.filter((col) =>
        col.startsWith(config.prefix)
      );

      if (groupColumns.length === 0) {
        errors.push(`Missing column group: ${groupName} (${config.prefix}*)`);
      } else if (groupColumns.length !== config.expectedCount) {
        warnings.push(
          `${groupName} column count mismatch: Found ${groupColumns.length}, expected ${config.expectedCount}`
        );
      }
    }
  );

  // Data quality checks
  const completionStats = calculateCompletionStats(data);

  Object.entries(completionStats).forEach(([field, stats]) => {
    if (
      SURVEY_CONFIG.requiredColumns.includes(field) &&
      stats.completionRate < SURVEY_CONFIG.validation.requiredCompletionRate
    ) {
      warnings.push(
        `Low completion rate for required field "${field}": ${(stats.completionRate * 100).toFixed(1)}%`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    summary: {
      totalResponses: data.length,
      totalColumns: actualColumns.length,
      completionStats,
    },
  };
}

/**
 * Calculate completion statistics for each field
 * @param {Array<Object>} data - Survey responses
 * @returns {Object} Completion stats by field
 */
export function calculateCompletionStats(data) {
  if (!data || data.length === 0) return {};

  const stats = {};
  const firstRow = data[0];
  const columns = Object.keys(firstRow);

  columns.forEach((col) => {
    let validCount = 0;
    let emptyCount = 0;

    data.forEach((row) => {
      const value = row[col];
      if (value !== null && value !== undefined && value !== '') {
        validCount++;
      } else {
        emptyCount++;
      }
    });

    stats[col] = {
      validCount,
      emptyCount,
      completionRate: validCount / data.length,
      percentage: ((validCount / data.length) * 100).toFixed(1),
    };
  });

  return stats;
}

/**
 * Validate data types for columns
 * @param {Array<Object>} data - Survey responses
 * @returns {Object} Type validation results
 */
export function validateDataTypes(data) {
  const typeErrors = [];

  data.forEach((row, index) => {
    // Validate dates
    SURVEY_CONFIG.columnTypes.dates.forEach((col) => {
      if (row[col] !== null && row[col] !== undefined) {
        if (!(row[col] instanceof Date) && typeof row[col] !== 'number') {
          typeErrors.push(
            `Row ${index + 1}, column "${col}": Expected date, got ${typeof row[col]}`
          );
        }
      }
    });

    // Validate numbers
    SURVEY_CONFIG.columnTypes.numbers.forEach((col) => {
      if (row[col] !== null && row[col] !== undefined && row[col] !== '') {
        if (typeof row[col] !== 'number') {
          typeErrors.push(
            `Row ${index + 1}, column "${col}": Expected number, got ${typeof row[col]}`
          );
        }
      }
    });

    // Validate binary fields (should be 0, 1, or null)
    SURVEY_CONFIG.columnTypes.binary.forEach((col) => {
      if (row[col] !== null && row[col] !== undefined && row[col] !== '') {
        const val = row[col];
        if (val !== 0 && val !== 1) {
          typeErrors.push(
            `Row ${index + 1}, column "${col}": Expected 0 or 1, got ${val}`
          );
        }
      }
    });
  });

  return {
    isValid: typeErrors.length === 0,
    errors: typeErrors.slice(0, 50), // Limit to first 50 errors
    totalErrors: typeErrors.length,
  };
}

/**
 * Generate validation report
 * @param {Array<Object>} data - Survey responses
 * @returns {Object} Comprehensive validation report
 */
export function generateValidationReport(data) {
  const schemaValidation = validateSchema(data);
  const typeValidation = validateDataTypes(data);

  return {
    timestamp: new Date().toISOString(),
    overview: {
      totalResponses: data.length,
      totalColumns: data.length > 0 ? Object.keys(data[0]).length : 0,
      schemaValid: schemaValidation.isValid,
      typesValid: typeValidation.isValid,
    },
    schema: schemaValidation,
    types: typeValidation,
    isValid: schemaValidation.isValid && typeValidation.isValid,
  };
}

/**
 * Print validation report to console
 * @param {Object} report - Validation report
 */
export function printValidationReport(report) {
  console.log('\n' + '='.repeat(80));
  console.log('DATA VALIDATION REPORT');
  console.log('='.repeat(80));
  console.log(`\nTimestamp: ${report.timestamp}`);
  console.log(
    `Total Responses: ${report.overview.totalResponses}`
  );
  console.log(`Total Columns: ${report.overview.totalColumns}`);
  console.log(
    `\nOverall Status: ${report.isValid ? '✅ VALID' : '❌ INVALID'}`
  );

  // Schema validation
  console.log('\n' + '-'.repeat(80));
  console.log('SCHEMA VALIDATION');
  console.log('-'.repeat(80));
  console.log(
    `Status: ${report.schema.isValid ? '✅ Valid' : '❌ Invalid'}`
  );

  if (report.schema.errors.length > 0) {
    console.log('\nErrors:');
    report.schema.errors.forEach((err) => console.log(`  ❌ ${err}`));
  }

  if (report.schema.warnings.length > 0) {
    console.log('\nWarnings:');
    report.schema.warnings.forEach((warn) => console.log(`  ⚠️  ${warn}`));
  }

  // Type validation
  console.log('\n' + '-'.repeat(80));
  console.log('TYPE VALIDATION');
  console.log('-'.repeat(80));
  console.log(
    `Status: ${report.types.isValid ? '✅ Valid' : '❌ Invalid'}`
  );

  if (report.types.totalErrors > 0) {
    console.log(`\nTotal Type Errors: ${report.types.totalErrors}`);
    if (report.types.errors.length > 0) {
      console.log('\nFirst 10 Errors:');
      report.types.errors
        .slice(0, 10)
        .forEach((err) => console.log(`  ❌ ${err}`));
    }
  }

  console.log('\n' + '='.repeat(80));
}

export default {
  validateSchema,
  calculateCompletionStats,
  validateDataTypes,
  generateValidationReport,
  printValidationReport,
};
