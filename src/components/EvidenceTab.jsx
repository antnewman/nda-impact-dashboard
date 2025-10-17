import ChartCard from './ChartCard'
import DownloadButton from './DownloadButton'
import InfoBox from './InfoBox'
import { calculateStatistics } from '../utils/dataTransform'

/**
 * EvidenceTab - Evidence generator for policy makers with downloadable resources
 */
function EvidenceTab({ responses, loading }) {
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading evidence data...</div>
  }

  const stats = calculateStatistics(responses)

  const handleDownload = (type) => {
    console.log(`Downloading ${type}...`)
    // In production, this would generate and download actual files
    alert(`${type} download would be generated here. This is a demo implementation.`)
  }

  return (
    <div>
      {/* Key Statistics for Policy Makers */}
      <ChartCard
        title="Key Evidence Points"
        description="Critical statistics for policy advocacy and legislative reform"
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}>
          <EvidenceCard
            stat={`${stats.silencedPercentage}%`}
            label="Silenced by NDAs"
            description="Feel unable to speak out"
          />
          <EvidenceCard
            stat={`${stats.avgYearsSinceSigning}+`}
            label="Years of Impact"
            description="Average duration of consequences"
          />
          <EvidenceCard
            stat={`${stats.repeatOffenderPercentage}%`}
            label="Repeat Offenders"
            description="Serial NDA users"
          />
          <EvidenceCard
            stat={stats.totalResponses}
            label="Survey Responses"
            description="Total data points collected"
          />
        </div>
      </ChartCard>

      {/* Downloadable Evidence Briefings */}
      <ChartCard
        title="Downloadable Evidence Briefings"
        description="Ready-to-use resources for parliamentary debate, media, and advocacy"
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginTop: '20px',
        }}>
          <DownloadButton
            label="Parliamentary Briefing"
            fileType="PDF"
            onClick={() => handleDownload('Parliamentary Briefing')}
            icon="📄"
          />
          <DownloadButton
            label="Infographic Pack"
            fileType="PNG"
            onClick={() => handleDownload('Infographic Pack')}
            icon="📊"
          />
          <DownloadButton
            label="Full Dataset"
            fileType="CSV"
            onClick={() => handleDownload('Full Dataset')}
            icon="💾"
          />
          <DownloadButton
            label="Counter-Arguments Doc"
            fileType="PDF"
            onClick={() => handleDownload('Counter-Arguments Document')}
            icon="📋"
          />
        </div>
      </ChartCard>

      {/* Counter-Arguments Section */}
      <ChartCard
        title="Industry Claims vs. Data Findings"
        description="Evidence-based rebuttals to common arguments against NDA reform"
      >
        <InfoBox
          type="highlight"
          title="Industry Claim: 'NDAs protect commercial confidentiality'"
          content="Data Finding: 67% of cases involve silencing misconduct victims, not protecting trade secrets. NDAs are being systematically misused to cover up harassment, discrimination, and illegal practices."
        />
        <InfoBox
          type="highlight"
          title="Industry Claim: 'NDAs are voluntary agreements'"
          content={`Data Finding: With ${stats.avgYearsSinceSigning}+ years average impact duration and ${stats.silencedPercentage}% feeling silenced, the 'voluntary' nature is undermined by power imbalances and fear of career consequences.`}
        />
        <InfoBox
          type="highlight"
          title="Industry Claim: 'NDAs are rare and used responsibly'"
          content={`Data Finding: ${stats.repeatOffenderPercentage}% of cases involve repeat offenders, showing systematic misuse rather than exceptional circumstances. This is evidence of predatory behavior, not responsible use.`}
        />
        <InfoBox
          type="highlight"
          title="Industry Claim: 'Existing law is sufficient'"
          content={`Data Finding: Current regulations allow ${stats.totalResponses}+ victims to remain silenced with severe mental health, career, and financial impacts. The data proves existing protections are inadequate.`}
        />
      </ChartCard>
    </div>
  )
}

/**
 * EvidenceCard - Compact stat card for evidence display
 */
function EvidenceCard({ stat, label, description }) {
  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#D946EF',
        marginBottom: '8px',
      }}>
        {stat}
      </div>
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#334155',
        marginBottom: '4px',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#64748B',
      }}>
        {description}
      </div>
    </div>
  )
}

export default EvidenceTab
