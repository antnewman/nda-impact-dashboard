import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import StatCard from './StatCard'
import ChartCard from './ChartCard'
import { calculateStatistics } from '../utils/dataTransform'

/**
 * OverviewTab - Main dashboard overview showing key statistics and summary visualizations
 */
function OverviewTab({ responses, loading }) {
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading overview data...</div>
  }

  const stats = calculateStatistics(responses)

  // Data for repeat offenders pie chart
  const repeatOffenderData = [
    { name: 'Repeat Offenders', value: stats.repeatOffenderPercentage, color: '#D946EF' },
    { name: 'Single Incidents', value: 100 - stats.repeatOffenderPercentage, color: '#10B981' },
  ]

  return (
    <div>
      {/* Key Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        <StatCard
          title="Silenced"
          value={`${stats.silencedPercentage}%`}
          subtitle="Fear of speaking out"
          color="#D946EF"
        />
        <StatCard
          title="Avg. Impact Duration"
          value={`${stats.avgYearsSinceSigning}+ years`}
          subtitle="Years since signing"
          color="#334155"
        />
        <StatCard
          title="Repeat Offenders"
          value={`${stats.repeatOffenderPercentage}%`}
          subtitle="Serial NDA users"
          color="#EF4444"
        />
        <StatCard
          title="Total Responses"
          value={stats.totalResponses}
          subtitle="Survey participants"
          color="#10B981"
        />
      </div>

      {/* Charts Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
      }}>
        {/* Repeat Offenders Pie Chart */}
        <ChartCard
          title="Repeat Offenders vs Single Incidents"
          description="Organizations using NDAs repeatedly versus one-time usage"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={repeatOffenderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {repeatOffenderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Impact Summary */}
        <ChartCard
          title="Average Impact Scores"
          description="Mean severity across different impact categories (0-10 scale)"
        >
          <div style={{ padding: '20px 0' }}>
            <ImpactBar label="Mental Health" value={stats.avgMentalHealthImpact} max={10} />
            <ImpactBar label="Career" value={stats.avgCareerImpact} max={10} />
            <ImpactBar label="Financial" value={stats.avgFinancialImpact} max={10} />
          </div>
        </ChartCard>
      </div>
    </div>
  )
}

/**
 * ImpactBar - Simple horizontal bar chart for impact scores
 */
function ImpactBar({ label, value, max }) {
  const percentage = (value / max) * 100

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#334155',
      }}>
        <span style={{ fontWeight: '600' }}>{label}</span>
        <span style={{ fontWeight: '700', color: '#D946EF' }}>{value.toFixed(1)}</span>
      </div>
      <div style={{
        width: '100%',
        height: '12px',
        backgroundColor: '#E2E8F0',
        borderRadius: '6px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: '#D946EF',
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  )
}

export default OverviewTab
