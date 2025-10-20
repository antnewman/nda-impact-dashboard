/**
 * Survey Data Transformer
 * Transforms raw 206-column survey data into format compatible with dashboard components
 */

import { getColumnsByPrefix } from '../config/surveyConfig.js';

/**
 * Calculate years between two dates
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date (defaults to now)
 * @returns {number} Years elapsed
 */
function calculateYears(startDate, endDate = new Date()) {
  if (!startDate) return 0;
  const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(0, Math.round(years * 10) / 10); // Round to 1 decimal
}

/**
 * Calculate impact score from binary impact columns
 * Maps multiple impact indicators to a 0-10 scale
 * @param {Object} response - Survey response
 * @param {Array<string>} impactColumns - Impact column names to aggregate
 * @returns {number} Impact score 0-10
 */
function calculateImpactScore(response, impactColumns) {
  const activeImpacts = impactColumns.filter(
    (col) => response[col] === 1
  ).length;

  // Convert count to 0-10 scale
  // More active impacts = higher score
  const maxImpacts = impactColumns.length;
  return Math.min(10, Math.round((activeImpacts / maxImpacts) * 10));
}

/**
 * Determine if organization is a repeat offender
 * Based on:
 * - Multiple targets reported
 * - Evidence of systemic issues (multiple treatment types)
 * - Formal consequences showing "NoIntervention"
 * @param {Object} response - Survey response
 * @returns {boolean} True if repeat offender indicators present
 */
function isRepeatOffender(response) {
  // Multiple targets
  if (response.Targets > 1) return true;

  // No intervention after formal report
  if (
    response.ReportingType === 'Formal report' &&
    response.FormalConsequence_NoIntervention === 1
  ) {
    return true;
  }

  // Many types of harassment (>5 treatment types)
  const treatmentColumns = getColumnsByPrefix('Treatment_').filter(
    (col) => !col.endsWith('_None') && !col.endsWith('_Other')
  );
  const treatmentCount = treatmentColumns.filter(
    (col) => response[col] === 1
  ).length;

  return treatmentCount > 5;
}

/**
 * Transform single survey response to dashboard format
 * @param {Object} rawResponse - Raw survey response (206 columns)
 * @param {number} index - Response index for ID generation
 * @returns {Object} Transformed response compatible with dashboard
 */
export function transformResponse(rawResponse, index) {
  // Calculate impact scores from Impact_* columns
  const mentalHealthImpact = rawResponse.Impact_MentalHealth === 1 ? 8 : 0;

  // Career impact: combination of multiple factors
  const careerImpact = calculateImpactScore(rawResponse, [
    'Impact_Performance',
    'Impact_Opportunities',
    'Impact_Leave',
  ]);

  // Financial impact: inferred from leaving job or demotion
  const financialImpact =
    rawResponse.Exit === 'Yes' || rawResponse.Treatment_Demotion === 1
      ? 7
      : rawResponse.Impact_TimeOff === 1
        ? 4
        : 0;

  // Isolation impact
  const isolationImpact = calculateImpactScore(rawResponse, [
    'Impact_Avoided',
    'Impact_SocialiseLess',
    'Impact_Confidence',
  ]);

  // Fear of speaking: combination of NDA + satisfaction scores
  let fearSpeakingScore = 0;
  if (rawResponse.FormalNDA === 'Yes' || rawResponse.InformalNDA === 'Yes') {
    fearSpeakingScore = 9; // NDA signed = high fear
  } else if (
    rawResponse.FormalSatisfaction !== null &&
    rawResponse.FormalSatisfaction !== undefined
  ) {
    // Low satisfaction = higher fear (invert 0-10 scale)
    fearSpeakingScore = 10 - rawResponse.FormalSatisfaction;
  } else if (rawResponse.ReportingType === 'No report') {
    fearSpeakingScore = 8; // Didn't report = significant fear
  }

  // Calculate years since incident
  const yearsSinceSigning = rawResponse.EndDate
    ? calculateYears(rawResponse.EndDate)
    : rawResponse.StartDate
      ? calculateYears(rawResponse.StartDate)
      : 0;

  // Determine NDA status
  const ndaSigned =
    rawResponse.FormalNDA === 'Yes' || rawResponse.InformalNDA === 'Yes';

  return {
    // Core dashboard fields (backward compatible)
    id: rawResponse.id || `response_${index + 1}`,
    sector: rawResponse.Sector || 'Unknown',
    organisation_size: rawResponse.Company || 'Unknown',
    nda_signed: ndaSigned,
    repeat_offender: isRepeatOffender(rawResponse),
    years_since_signing: yearsSinceSigning,

    // Impact scores (0-10 scale)
    impact_mental_health: mentalHealthImpact,
    impact_career: careerImpact,
    impact_financial: financialImpact,
    impact_isolation: isolationImpact,
    impact_fear_speaking: fearSpeakingScore,

    // Metadata
    created_at: rawResponse.Timestamp || new Date(),

    // Extended data (preserve all original fields for detailed analysis)
    demographics: {
      age: rawResponse.Age,
      gender: rawResponse.Gender,
      sexuality: rawResponse.Sexuality,
      ethnicity: rawResponse.Ethnicity,
      disability: rawResponse.Disability,
      religion: rawResponse.Religion,
      marital: rawResponse.Marital,
    },

    incident: {
      startDate: rawResponse.StartDate,
      endDate: rawResponse.EndDate,
      perpetrator: rawResponse.Perpetrator,
      perpetratorGender: rawResponse.PerpetratorGender,
      targets: rawResponse.Targets,
      location: rawResponse.Location,
      isUK: rawResponse.IsUK,
    },

    reporting: {
      type: rawResponse.ReportingType,
      formal: {
        date: rawResponse.FormalDate,
        who: rawResponse.FormalWho,
        impact: rawResponse.FormalImpact,
        satisfaction: rawResponse.FormalSatisfaction,
        police: rawResponse.FormalPolice,
        nda: rawResponse.FormalNDA,
        priorInformal: rawResponse.FormalPriorInformal,
      },
      informal: {
        date: rawResponse.InformalDate,
        who: rawResponse.InformalWho,
        impact: rawResponse.InformalImpact,
        satisfaction: rawResponse.InformalSatisfaction,
        police: rawResponse.InformalPolice,
        nda: rawResponse.InformalNDA,
      },
      noReport: {
        police: rawResponse.NoReportPolice,
      },
    },

    exit: rawResponse.Exit,

    // Preserve all raw data for advanced filtering
    raw: rawResponse,
  };
}

/**
 * Transform array of survey responses
 * @param {Array<Object>} rawResponses - Raw survey responses
 * @returns {Array<Object>} Transformed responses
 */
export function transformSurveyData(rawResponses) {
  if (!Array.isArray(rawResponses)) {
    throw new Error('Expected array of survey responses');
  }

  return rawResponses.map((response, index) =>
    transformResponse(response, index)
  );
}

/**
 * Get aggregated statistics for multi-select columns
 * @param {Array<Object>} responses - Raw survey responses
 * @param {string} prefix - Column prefix (e.g., "Treatment_", "Impact_")
 * @returns {Object} Aggregated counts for each column
 */
export function aggregateMultiSelectColumns(responses, prefix) {
  const columns = getColumnsByPrefix(prefix);
  const aggregated = {};

  columns.forEach((col) => {
    aggregated[col] = {
      count: responses.filter((r) => r[col] === 1).length,
      percentage: 0,
      label: col.replace(prefix, '').replace(/_/g, ' '),
    };
  });

  // Calculate percentages
  const total = responses.length;
  Object.keys(aggregated).forEach((col) => {
    aggregated[col].percentage = (
      (aggregated[col].count / total) *
      100
    ).toFixed(1);
  });

  return aggregated;
}

/**
 * Calculate harassment severity score for a response
 * Based on number and types of harassment experienced
 * @param {Object} response - Survey response
 * @returns {number} Severity score 0-10
 */
export function calculateHarassmentSeverity(response) {
  let severityScore = 0;

  // Sexual harassment = highest severity
  const sexHarassColumns = getColumnsByPrefix('SexHarass_').filter(
    (col) => !col.endsWith('_None')
  );
  const sexHarassCount = sexHarassColumns.filter(
    (col) => response[col] === 1
  ).length;
  severityScore += sexHarassCount * 2; // Weight sexual harassment heavily

  // Treatment types
  const treatmentColumns = getColumnsByPrefix('Treatment_').filter(
    (col) => !col.endsWith('_None') && !col.endsWith('_Other')
  );
  const treatmentCount = treatmentColumns.filter(
    (col) => response[col] === 1
  ).length;
  severityScore += treatmentCount * 0.5;

  // Discrimination
  const discriminationColumns = getColumnsByPrefix('Discrimination_').filter(
    (col) => !col.endsWith('_None') && !col.endsWith('_Other')
  );
  const discriminationCount = discriminationColumns.filter(
    (col) => response[col] === 1
  ).length;
  severityScore += discriminationCount;

  return Math.min(10, Math.round(severityScore));
}

/**
 * Enrich responses with calculated fields
 * @param {Array<Object>} responses - Transformed responses
 * @returns {Array<Object>} Enriched responses
 */
export function enrichResponses(responses) {
  return responses.map((response) => ({
    ...response,
    harassment_severity: calculateHarassmentSeverity(response.raw),
    has_sexual_harassment:
      response.raw.SexHarass_None !== 1 &&
      getColumnsByPrefix('SexHarass_').some(
        (col) => !col.endsWith('_None') && response.raw[col] === 1
      ),
    has_discrimination:
      response.raw.Discrimination_None !== 1 &&
      getColumnsByPrefix('Discrimination_').some(
        (col) => !col.endsWith('_None') && response.raw[col] === 1
      ),
    duration_months: response.incident.startDate && response.incident.endDate
      ? Math.round(
          (response.incident.endDate - response.incident.startDate) /
            (1000 * 60 * 60 * 24 * 30)
        )
      : null,
  }));
}

export default {
  transformResponse,
  transformSurveyData,
  aggregateMultiSelectColumns,
  calculateHarassmentSeverity,
  enrichResponses,
};
