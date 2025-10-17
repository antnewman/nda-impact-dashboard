/**
 * ChartCard - Wrapper component for charts with consistent styling
 * Provides a card container with title and optional description
 */
function ChartCard({ title, description, children }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #E2E8F0',
      marginBottom: '24px',
    }}>
      {title && (
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#334155',
          margin: '0 0 8px 0',
        }}>
          {title}
        </h3>
      )}
      {description && (
        <p style={{
          fontSize: '14px',
          color: '#64748B',
          margin: '0 0 20px 0',
        }}>
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

export default ChartCard
