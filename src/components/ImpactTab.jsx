import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import ChartCard from './ChartCard'
import { aggregateImpactData } from '../utils/dataTransform'

/**
 * ImpactTab - Detailed impact analysis showing severity levels and timeline
 */
function ImpactTab({ responses, loading }) {
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading impact data...</div>
  }

  const impactData = aggregateImpactData(responses)

  // Timeline data - group by years since signing
  const timelineData = generateTimelineData(responses)

  return (
    <div>
      {/* Impact Severity Bar Chart */}
      <ChartCard
        title="NDA Impact by Severity Level"
        description="Distribution of impact severity across different categories (None to Severe)"
      >
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={impactData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="level" tick={{ fill: '#334155' }} />
            <YAxis
              label={{ value: 'Number of Responses', angle: -90, position: 'insideLeft', fill: '#334155' }}
              tick={{ fill: '#334155' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="Mental Health" fill="#D946EF" />
            <Bar dataKey="Career" fill="#334155" />
            <Bar dataKey="Financial" fill="#10B981" />
            <Bar dataKey="Isolation" fill="#F59E0B" />
            <Bar dataKey="Fear of Speaking" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Impact Timeline */}
      <ChartCard
        title="Impact Duration Timeline"
        description="How impact persists over years since signing NDA"
      >
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={timelineData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="years"
              label={{ value: 'Years Since Signing', position: 'insideBottom', offset: -5, fill: '#334155' }}
              tick={{ fill: '#334155' }}
            />
            <YAxis
              label={{ value: 'Average Impact Score', angle: -90, position: 'insideLeft', fill: '#334155' }}
              tick={{ fill: '#334155' }}
              domain={[0, 10]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Line type="monotone" dataKey="Mental Health" stroke="#D946EF" strokeWidth={2} />
            <Line type="monotone" dataKey="Career" stroke="#334155" strokeWidth={2} />
            <Line type="monotone" dataKey="Financial" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

/**
 * Generate timeline data grouped by years since signing
 */
function generateTimelineData(responses) {
  const yearGroups = {}

  responses.forEach(response => {
    const years = response.years_since_signing || 0

    if (!yearGroups[years]) {
      yearGroups[years] = {
        years,
        mentalHealthSum: 0,
        mentalHealthCount: 0,
        careerSum: 0,
        careerCount: 0,
        financialSum: 0,
        financialCount: 0,
      }
    }

    if (response.impact_mental_health !== null) {
      yearGroups[years].mentalHealthSum += response.impact_mental_health
      yearGroups[years].mentalHealthCount++
    }

    if (response.impact_career !== null) {
      yearGroups[years].careerSum += response.impact_career
      yearGroups[years].careerCount++
    }

    if (response.impact_financial !== null) {
      yearGroups[years].financialSum += response.impact_financial
      yearGroups[years].financialCount++
    }
  })

  // Convert to array and calculate averages
  return Object.values(yearGroups)
    .map(group => ({
      years: `${group.years}y`,
      'Mental Health': group.mentalHealthCount > 0
        ? parseFloat((group.mentalHealthSum / group.mentalHealthCount).toFixed(1))
        : 0,
      'Career': group.careerCount > 0
        ? parseFloat((group.careerSum / group.careerCount).toFixed(1))
        : 0,
      'Financial': group.financialCount > 0
        ? parseFloat((group.financialSum / group.financialCount).toFixed(1))
        : 0,
    }))
    .sort((a, b) => parseInt(a.years) - parseInt(b.years))
}

export default ImpactTab
