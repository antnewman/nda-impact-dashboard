import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ChartCard from './ChartCard'
import { aggregateBySector } from '../utils/dataTransform'

/**
 * SectorsTab - Sector comparison showing NDA usage vs transparent resolution
 */
function SectorsTab({ responses, loading }) {
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading sector data...</div>
  }

  const sectorData = aggregateBySector(responses)

  return (
    <div>
      <ChartCard
        title="NDA Usage by Sector"
        description="Comparison of NDA-signed cases versus transparent resolution across different sectors"
      >
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={sectorData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="sector"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fill: '#334155', fontSize: 12 }}
            />
            <YAxis
              label={{ value: 'Number of Cases', angle: -90, position: 'insideLeft', fill: '#334155' }}
              tick={{ fill: '#334155' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="NDA Signed" fill="#D946EF" />
            <Bar dataKey="Transparent Resolution" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Sector Statistics Table */}
      <ChartCard
        title="Sector Statistics"
        description="Detailed breakdown of NDA usage by sector"
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#334155', fontWeight: '600' }}>Sector</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#334155', fontWeight: '600' }}>NDA Signed</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#334155', fontWeight: '600' }}>Transparent</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#334155', fontWeight: '600' }}>Total</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#334155', fontWeight: '600' }}>NDA %</th>
              </tr>
            </thead>
            <tbody>
              {sectorData.map((sector, index) => {
                const ndaPercentage = sector.total > 0
                  ? Math.round((sector['NDA Signed'] / sector.total) * 100)
                  : 0

                return (
                  <tr key={index} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '12px', color: '#334155', fontWeight: '500' }}>{sector.sector}</td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#D946EF', fontWeight: '600' }}>
                      {sector['NDA Signed']}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#10B981', fontWeight: '600' }}>
                      {sector['Transparent Resolution']}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#334155' }}>{sector.total}</td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#334155', fontWeight: '600' }}>
                      {ndaPercentage}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  )
}

export default SectorsTab
