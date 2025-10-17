import ChartCard from './ChartCard'
import InfoBox from './InfoBox'
import { calculateDataCompleteness } from '../utils/dataTransform'

/**
 * InsightsTab - Gap analysis and survey enhancement suggestions
 */
function InsightsTab({ responses, loading }) {
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading insights data...</div>
  }

  const completeness = calculateDataCompleteness(responses)

  // Sort fields by completeness percentage
  const sortedFields = Object.values(completeness).sort((a, b) => a.percentage - b.percentage)

  // Identify gaps (fields with <80% completeness)
  const gaps = sortedFields.filter(field => field.percentage < 80)

  // Suggested future questions based on current data patterns
  const suggestedQuestions = [
    {
      question: "What industry-specific factors contributed to the NDA being offered?",
      rationale: "Understanding sector-specific patterns could reveal systemic issues in particular industries.",
      priority: "High",
    },
    {
      question: "Did the NDA prevent you from reporting illegal activity to authorities?",
      rationale: "Critical for demonstrating NDAs being used to obstruct justice.",
      priority: "High",
    },
    {
      question: "What was the approximate monetary value of the settlement?",
      rationale: "Would help quantify the financial incentives behind NDA usage.",
      priority: "Medium",
    },
    {
      question: "Were you represented by legal counsel when signing the NDA?",
      rationale: "Shows power imbalance and whether victims had adequate support.",
      priority: "High",
    },
    {
      question: "Has the NDA impacted your ability to seek employment in your field?",
      rationale: "Demonstrates long-term career consequences beyond general impact scores.",
      priority: "Medium",
    },
    {
      question: "Did you experience retaliation after raising concerns, before the NDA?",
      rationale: "Establishes pattern of organizational misconduct beyond the NDA itself.",
      priority: "Medium",
    },
  ]

  return (
    <div>
      {/* Data Completeness Overview */}
      <ChartCard
        title="Data Completeness Analysis"
        description="Percentage of complete responses per data field"
      >
        <div style={{ marginBottom: '20px' }}>
          {sortedFields.map((field, index) => (
            <CompletenessBar
              key={index}
              label={formatFieldName(field.field)}
              percentage={field.percentage}
              validCount={field.validCount}
              missing={field.missing}
            />
          ))}
        </div>
      </ChartCard>

      {/* Missing Data Gaps */}
      {gaps.length > 0 && (
        <ChartCard
          title="Identified Data Gaps"
          description="Fields with less than 80% completeness that need more responses"
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}>
            {gaps.map((gap, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  borderRadius: '8px',
                  padding: '16px',
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#334155',
                  marginBottom: '8px',
                }}>
                  {formatFieldName(gap.field)}
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#D97706',
                  marginBottom: '4px',
                }}>
                  {gap.percentage}%
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#78716C',
                }}>
                  {gap.missing} responses missing
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      )}

      {/* Suggested Future Survey Questions */}
      <ChartCard
        title="Suggested Survey Enhancements"
        description="Recommended questions to strengthen advocacy and address data gaps"
      >
        {suggestedQuestions.map((item, index) => (
          <InfoBox
            key={index}
            type={item.priority === 'High' ? 'highlight' : 'info'}
            title={`${item.priority} Priority: ${item.question}`}
            content={item.rationale}
          />
        ))}
      </ChartCard>

      {/* Actionable Insights */}
      <ChartCard
        title="Actionable Insights for Survey Team"
        description="Recommendations to improve data collection"
      >
        <InfoBox
          type="success"
          title="Strength: High Response Rate on Impact Metrics"
          content="Mental health, career, and financial impact fields have strong completion rates. Continue emphasizing these in future surveys as they provide compelling evidence."
        />
        <InfoBox
          type="warning"
          title="Action Needed: Sector Classification Gaps"
          content={gaps.find(g => g.field === 'sector')
            ? `Sector data is ${gaps.find(g => g.field === 'sector').percentage}% complete. Consider making this a required field or providing clearer sector categories to respondents.`
            : 'Sector data is well-captured. Continue current approach.'}
        />
        <InfoBox
          type="info"
          title="Opportunity: Demographic Expansion"
          content="Consider adding demographic questions (age range, geographic location, job level) to identify particularly vulnerable populations and strengthen intersectional advocacy."
        />
      </ChartCard>
    </div>
  )
}

/**
 * CompletenessBar - Visual bar showing data completeness percentage
 */
function CompletenessBar({ label, percentage, validCount, missing }) {
  const color = percentage >= 80 ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444'

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
      }}>
        <span style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#334155',
        }}>
          {label}
        </span>
        <span style={{
          fontSize: '14px',
          fontWeight: '600',
          color: color,
        }}>
          {percentage}% ({validCount} / {validCount + missing})
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '10px',
        backgroundColor: '#E2E8F0',
        borderRadius: '5px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  )
}

/**
 * Format field names for display
 */
function formatFieldName(field) {
  const names = {
    'sector': 'Sector',
    'organisation_size': 'Organisation Size',
    'nda_signed': 'NDA Signed Status',
    'impact_mental_health': 'Mental Health Impact',
    'impact_career': 'Career Impact',
    'impact_financial': 'Financial Impact',
    'impact_isolation': 'Isolation Impact',
    'impact_fear_speaking': 'Fear of Speaking Impact',
    'repeat_offender': 'Repeat Offender Status',
    'years_since_signing': 'Years Since Signing',
  }
  return names[field] || field
}

export default InsightsTab
