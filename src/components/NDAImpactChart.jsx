import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { supabase } from '../supabaseClient'

function NDAImpactChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchImpactData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchImpactData() {
    try {
      setLoading(true)

      // Fetch all responses from nda_responses table
      const { data: responses, error } = await supabase
        .from('nda_responses')
        .select('impact_mental_health, impact_career, impact_financial')

      if (error) throw error

      console.log('Fetched responses:', responses)

      // Aggregate the data by counting occurrences of each impact level
      const aggregatedData = aggregateImpactData(responses)
      setData(aggregatedData)
    } catch (error) {
      console.error('Error fetching NDA impact data:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  function aggregateImpactData(responses) {
    // Initialize counters for each impact category
    const mentalHealthCounts = {}
    const careerCounts = {}
    const financialCounts = {}

    // Count occurrences of each impact level (numeric values 0-10)
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
    })

    // Convert to array format for recharts
    const impactLevels = ['None', 'Low', 'Medium', 'High', 'Severe']

    return impactLevels.map(level => ({
      level,
      'Mental Health': mentalHealthCounts[level] || 0,
      'Career': careerCounts[level] || 0,
      'Financial': financialCounts[level] || 0
    }))
  }

  function mapScoreToLevel(score) {
    if (score === 0) return 'None'
    if (score >= 1 && score <= 3) return 'Low'
    if (score >= 4 && score <= 6) return 'Medium'
    if (score >= 7 && score <= 8) return 'High'
    if (score >= 9 && score <= 10) return 'Severe'
    return 'None'
  }

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading impact data...</div>
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>
  }

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>NDA Impact Analysis</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" />
          <YAxis label={{ value: 'Number of Responses', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Mental Health" fill="#8884d8" />
          <Bar dataKey="Career" fill="#82ca9d" />
          <Bar dataKey="Financial" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default NDAImpactChart