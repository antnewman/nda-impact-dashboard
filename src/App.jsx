import { useState, useEffect } from 'react'
import { loadSurveyDataFromPublic } from './utils/dataLoader'
import OverviewTab from './components/OverviewTab'
import SectorsTab from './components/SectorsTab'
import ImpactTab from './components/ImpactTab'
import EvidenceTab from './components/EvidenceTab'
import InsightsTab from './components/InsightsTab'
import './App.css'

/**
 * Main App Component - NDA Impact Dashboard
 * A Tortoise AI project for Speak Out Revolution & Can't Buy My Silence
 *
 * Updated to use real survey data from Excel files
 */
function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSurveyData()
  }, [])

  async function loadSurveyData() {
    try {
      setLoading(true)
      setError(null)

      // Load real survey data from Excel file
      const result = await loadSurveyDataFromPublic(
        'The Speak Out Survey (Responses) - Synthetic.xlsx',
        { enrich: true }
      )

      if (!result.success) {
        throw new Error(result.error || 'Failed to load survey data')
      }

      console.log('Loaded survey data:', {
        totalResponses: result.meta.totalResponses,
        loadedAt: result.meta.loadedAt,
        sample: result.data.slice(0, 3)
      })

      setResponses(result.data || [])
    } catch (err) {
      console.error('Error loading survey data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sectors', label: 'Sectors' },
    { id: 'impact', label: 'Impact' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'insights', label: 'Insights' },
  ]

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">Breaking the Silence</h1>
        <p className="app-subtitle">Data Evidence to Make NDA Reform Watertight</p>
        <p className="app-attribution">
          A Tortoise AI project for Speak Out Revolution & Can't Buy My Silence
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="app-content">
        {error && (
          <div className="error-message">
            Error loading data: {error}
          </div>
        )}

        {activeTab === 'overview' && <OverviewTab responses={responses} loading={loading} />}
        {activeTab === 'sectors' && <SectorsTab responses={responses} loading={loading} />}
        {activeTab === 'impact' && <ImpactTab responses={responses} loading={loading} />}
        {activeTab === 'evidence' && <EvidenceTab responses={responses} loading={loading} />}
        {activeTab === 'insights' && <InsightsTab responses={responses} loading={loading} />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built by <a href="https://tortoiseai.co.uk" target="_blank" rel="noopener noreferrer">Tortoise AI</a> |
          Data attribution to Speak Out Revolution
        </p>
      </footer>
    </div>
  )
}

export default App
