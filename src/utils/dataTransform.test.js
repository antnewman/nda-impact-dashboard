import { describe, it, expect } from 'vitest'
import {
  mapScoreToLevel,
  calculateStatistics,
  aggregateImpactData,
  aggregateBySector,
  calculateDataCompleteness,
} from './dataTransform'

describe('mapScoreToLevel', () => {
  it('maps 0 to None', () => {
    expect(mapScoreToLevel(0)).toBe('None')
  })

  it('maps 1-3 to Low', () => {
    expect(mapScoreToLevel(1)).toBe('Low')
    expect(mapScoreToLevel(2)).toBe('Low')
    expect(mapScoreToLevel(3)).toBe('Low')
  })

  it('maps 4-6 to Medium', () => {
    expect(mapScoreToLevel(4)).toBe('Medium')
    expect(mapScoreToLevel(5)).toBe('Medium')
    expect(mapScoreToLevel(6)).toBe('Medium')
  })

  it('maps 7-8 to High', () => {
    expect(mapScoreToLevel(7)).toBe('High')
    expect(mapScoreToLevel(8)).toBe('High')
  })

  it('maps 9-10 to Severe', () => {
    expect(mapScoreToLevel(9)).toBe('Severe')
    expect(mapScoreToLevel(10)).toBe('Severe')
  })
})

describe('calculateStatistics', () => {
  const mockResponses = [
    {
      impact_mental_health: 8,
      impact_career: 7,
      impact_financial: 6,
      impact_fear_speaking: 9,
      repeat_offender: true,
      years_since_signing: 5,
    },
    {
      impact_mental_health: 6,
      impact_career: 5,
      impact_financial: 4,
      impact_fear_speaking: 7,
      repeat_offender: false,
      years_since_signing: 3,
    },
  ]

  it('calculates total responses correctly', () => {
    const stats = calculateStatistics(mockResponses)
    expect(stats.totalResponses).toBe(2)
  })

  it('calculates silenced percentage correctly (fear_speaking >= 7)', () => {
    const stats = calculateStatistics(mockResponses)
    expect(stats.silencedPercentage).toBe(100) // Both have fear_speaking >= 7
  })

  it('calculates repeat offender percentage correctly', () => {
    const stats = calculateStatistics(mockResponses)
    expect(stats.repeatOffenderPercentage).toBe(50) // 1 out of 2
  })

  it('calculates average years since signing', () => {
    const stats = calculateStatistics(mockResponses)
    expect(stats.avgYearsSinceSigning).toBe(4) // (5 + 3) / 2 = 4
  })

  it('calculates average impact scores', () => {
    const stats = calculateStatistics(mockResponses)
    expect(stats.avgMentalHealthImpact).toBe(7.0) // (8 + 6) / 2
    expect(stats.avgCareerImpact).toBe(6.0) // (7 + 5) / 2
    expect(stats.avgFinancialImpact).toBe(5.0) // (6 + 4) / 2
  })

  it('handles empty array', () => {
    const stats = calculateStatistics([])
    expect(stats.totalResponses).toBe(0)
    expect(stats.silencedPercentage).toBe(0)
  })

  it('handles null values gracefully', () => {
    const responsesWithNulls = [
      {
        impact_mental_health: null,
        impact_career: 5,
        impact_financial: null,
        impact_fear_speaking: 8,
        repeat_offender: false,
        years_since_signing: null,
      },
    ]
    const stats = calculateStatistics(responsesWithNulls)
    expect(stats.avgMentalHealthImpact).toBe(0)
    expect(stats.avgCareerImpact).toBe(5.0)
  })
})

describe('aggregateImpactData', () => {
  const mockResponses = [
    {
      impact_mental_health: 9,
      impact_career: 7,
      impact_financial: 5,
      impact_isolation: 8,
      impact_fear_speaking: 10,
    },
    {
      impact_mental_health: 2,
      impact_career: 1,
      impact_financial: 0,
      impact_isolation: 3,
      impact_fear_speaking: 4,
    },
  ]

  it('returns array with all severity levels', () => {
    const result = aggregateImpactData(mockResponses)
    expect(result).toHaveLength(5)
    expect(result.map(r => r.level)).toEqual(['None', 'Low', 'Medium', 'High', 'Severe'])
  })

  it('counts impact levels correctly', () => {
    const result = aggregateImpactData(mockResponses)

    // Mental Health: 9 (Severe), 2 (Low)
    const severeLevel = result.find(r => r.level === 'Severe')
    expect(severeLevel['Mental Health']).toBe(1)

    const lowLevel = result.find(r => r.level === 'Low')
    expect(lowLevel['Mental Health']).toBe(1)
  })

  it('handles null values', () => {
    const responsesWithNull = [{ impact_mental_health: null }]
    const result = aggregateImpactData(responsesWithNull)
    expect(result).toHaveLength(5)
  })
})

describe('aggregateBySector', () => {
  const mockResponses = [
    { sector: 'Technology', nda_signed: true },
    { sector: 'Technology', nda_signed: false },
    { sector: 'Healthcare', nda_signed: true },
    { sector: null, nda_signed: true },
  ]

  it('groups responses by sector', () => {
    const result = aggregateBySector(mockResponses)
    expect(result).toHaveLength(3) // Technology, Healthcare, Unknown
  })

  it('counts NDA signed vs transparent correctly', () => {
    const result = aggregateBySector(mockResponses)
    const tech = result.find(r => r.sector === 'Technology')

    expect(tech['NDA Signed']).toBe(1)
    expect(tech['Transparent Resolution']).toBe(1)
    expect(tech.total).toBe(2)
  })

  it('handles null sectors as Unknown', () => {
    const result = aggregateBySector(mockResponses)
    const unknown = result.find(r => r.sector === 'Unknown')
    expect(unknown).toBeDefined()
    expect(unknown['NDA Signed']).toBe(1)
  })
})

describe('calculateDataCompleteness', () => {
  const mockResponses = [
    {
      sector: 'Technology',
      organisation_size: 'Large',
      nda_signed: true,
      impact_mental_health: 8,
      impact_career: null,
      impact_financial: 6,
      impact_isolation: 7,
      impact_fear_speaking: 9,
      repeat_offender: true,
      years_since_signing: 5,
    },
    {
      sector: null,
      organisation_size: 'Small',
      nda_signed: true,
      impact_mental_health: 6,
      impact_career: 5,
      impact_financial: null,
      impact_isolation: 4,
      impact_fear_speaking: 7,
      repeat_offender: false,
      years_since_signing: 3,
    },
  ]

  it('calculates completeness percentages correctly', () => {
    const result = calculateDataCompleteness(mockResponses)

    // sector: 1 out of 2 = 50%
    expect(result.sector.percentage).toBe(50)
    expect(result.sector.validCount).toBe(1)
    expect(result.sector.missing).toBe(1)

    // organisation_size: 2 out of 2 = 100%
    expect(result.organisation_size.percentage).toBe(100)
  })

  it('handles empty array', () => {
    const result = calculateDataCompleteness([])
    expect(result).toEqual({})
  })

  it('returns completeness for all fields', () => {
    const result = calculateDataCompleteness(mockResponses)
    const expectedFields = [
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

    expectedFields.forEach(field => {
      expect(result[field]).toBeDefined()
      expect(result[field].field).toBe(field)
    })
  })
})
