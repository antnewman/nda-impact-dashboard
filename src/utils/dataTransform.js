/**
 * Maps numeric impact scores (0-10) to severity level categories
 * @param {number} score - The impact score from 0 to 10
 * @returns {string} - Severity level: 'None', 'Low', 'Medium', 'High', or 'Severe'
 */
export function mapScoreToLevel(score) {
  if (score === 0) return 'None'
  if (score >= 1 && score <= 3) return 'Low'
  if (score >= 4 && score <= 6) return 'Medium'
  if (score >= 7 && score <= 8) return 'High'
  if (score >= 9 && score <= 10) return 'Severe'
  return 'None'
}

/**
 * Calculates key statistics from NDA response data
 * @param {Array} responses - Array of NDA response objects
 * @returns {Object} - Statistics including silenced percentage, repeat offenders, etc.
 */
export function calculateStatistics(responses) {
  if (!responses || responses.length === 0) {
    return {
      totalResponses: 0,
      silencedPercentage: 0,
      repeatOffenderPercentage: 0,
      avgYearsSinceSigning: 0,
      avgMentalHealthImpact: 0,
      avgCareerImpact: 0,
      avgFinancialImpact: 0,
    }
  }

  const totalResponses = responses.length

  // Calculate silenced percentage (impact_fear_speaking >= 7)
  const silencedCount = responses.filter(r => r.impact_fear_speaking >= 7).length
  const silencedPercentage = Math.round((silencedCount / totalResponses) * 100)

  // Calculate repeat offender percentage
  const repeatOffenderCount = responses.filter(r => r.repeat_offender === true).length
  const repeatOffenderPercentage = Math.round((repeatOffenderCount / totalResponses) * 100)

  // Calculate average years since signing
  const validYears = responses.filter(r => r.years_since_signing !== null)
  const avgYearsSinceSigning = validYears.length > 0
    ? Math.round(validYears.reduce((sum, r) => sum + r.years_since_signing, 0) / validYears.length)
    : 0

  // Calculate average impact scores
  const validMentalHealth = responses.filter(r => r.impact_mental_health !== null)
  const avgMentalHealthImpact = validMentalHealth.length > 0
    ? (validMentalHealth.reduce((sum, r) => sum + r.impact_mental_health, 0) / validMentalHealth.length).toFixed(1)
    : 0

  const validCareer = responses.filter(r => r.impact_career !== null)
  const avgCareerImpact = validCareer.length > 0
    ? (validCareer.reduce((sum, r) => sum + r.impact_career, 0) / validCareer.length).toFixed(1)
    : 0

  const validFinancial = responses.filter(r => r.impact_financial !== null)
  const avgFinancialImpact = validFinancial.length > 0
    ? (validFinancial.reduce((sum, r) => sum + r.impact_financial, 0) / validFinancial.length).toFixed(1)
    : 0

  return {
    totalResponses,
    silencedPercentage,
    repeatOffenderPercentage,
    avgYearsSinceSigning,
    avgMentalHealthImpact: parseFloat(avgMentalHealthImpact),
    avgCareerImpact: parseFloat(avgCareerImpact),
    avgFinancialImpact: parseFloat(avgFinancialImpact),
  }
}

/**
 * Aggregates impact data by severity levels for chart visualization
 * @param {Array} responses - Array of NDA response objects
 * @returns {Array} - Aggregated data by severity level
 */
export function aggregateImpactData(responses) {
  const mentalHealthCounts = {}
  const careerCounts = {}
  const financialCounts = {}
  const isolationCounts = {}
  const fearCounts = {}

  responses.forEach(response => {
    // Mental Health
    if (response.impact_mental_health !== null) {
      const level = mapScoreToLevel(response.impact_mental_health)
      mentalHealthCounts[level] = (mentalHealthCounts[level] || 0) + 1
    }

    // Career
    if (response.impact_career !== null) {
      const level = mapScoreToLevel(response.impact_career)
      careerCounts[level] = (careerCounts[level] || 0) + 1
    }

    // Financial
    if (response.impact_financial !== null) {
      const level = mapScoreToLevel(response.impact_financial)
      financialCounts[level] = (financialCounts[level] || 0) + 1
    }

    // Isolation
    if (response.impact_isolation !== null) {
      const level = mapScoreToLevel(response.impact_isolation)
      isolationCounts[level] = (isolationCounts[level] || 0) + 1
    }

    // Fear of Speaking
    if (response.impact_fear_speaking !== null) {
      const level = mapScoreToLevel(response.impact_fear_speaking)
      fearCounts[level] = (fearCounts[level] || 0) + 1
    }
  })

  const impactLevels = ['None', 'Low', 'Medium', 'High', 'Severe']

  return impactLevels.map(level => ({
    level,
    'Mental Health': mentalHealthCounts[level] || 0,
    'Career': careerCounts[level] || 0,
    'Financial': financialCounts[level] || 0,
    'Isolation': isolationCounts[level] || 0,
    'Fear of Speaking': fearCounts[level] || 0,
  }))
}

/**
 * Aggregates NDA data by sector for comparison
 * @param {Array} responses - Array of NDA response objects
 * @returns {Array} - Aggregated data by sector
 */
export function aggregateBySector(responses) {
  const sectorData = {}

  responses.forEach(response => {
    const sector = response.sector || 'Unknown'

    if (!sectorData[sector]) {
      sectorData[sector] = {
        sector,
        ndaSignedCount: 0,
        transparentCount: 0,
        total: 0,
      }
    }

    sectorData[sector].total++

    if (response.nda_signed) {
      sectorData[sector].ndaSignedCount++
    } else {
      sectorData[sector].transparentCount++
    }
  })

  return Object.values(sectorData).map(data => ({
    sector: data.sector,
    'NDA Signed': data.ndaSignedCount,
    'Transparent Resolution': data.transparentCount,
    total: data.total,
  }))
}

/**
 * Calculates data completeness metrics for gap analysis
 * @param {Array} responses - Array of NDA response objects
 * @returns {Object} - Completeness metrics per field
 */
export function calculateDataCompleteness(responses) {
  if (!responses || responses.length === 0) {
    return {}
  }

  const fields = [
    'sector',
    'organisation_size',
    'nda_signed',
    'impact_mental_health',
    'impact_career',
    'impact_financial',
    'impact_isolation',
    'impact_fear_speaking',
    'repeat_offender',
    'years_since_signing',
  ]

  const completeness = {}

  fields.forEach(field => {
    const validCount = responses.filter(r => r[field] !== null && r[field] !== undefined).length
    completeness[field] = {
      field,
      validCount,
      percentage: Math.round((validCount / responses.length) * 100),
      missing: responses.length - validCount,
    }
  })

  return completeness
}
