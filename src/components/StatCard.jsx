/**
 * StatCard - Displays a key statistic with title and value
 * Used for showing important metrics like percentages, counts, etc.
 */
function StatCard({ title, value, subtitle, color = '#D946EF' }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #E2E8F0',
      textAlign: 'center',
      minWidth: '200px',
    }}>
      <h3 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#334155',
        margin: '0 0 12px 0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {title}
      </h3>
      <div style={{
        fontSize: '36px',
        fontWeight: '700',
        color: color,
        margin: '8px 0',
      }}>
        {value}
      </div>
      {subtitle && (
        <p style={{
          fontSize: '14px',
          color: '#64748B',
          margin: '8px 0 0 0',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default StatCard
