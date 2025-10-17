/**
 * InfoBox - Displays informational content with optional icon
 * Used for highlighting important information, tips, or insights
 */
function InfoBox({ title, content, type = 'info' }) {
  const colors = {
    info: { bg: '#EEF2FF', border: '#C7D2FE', text: '#334155' },
    success: { bg: '#ECFDF5', border: '#A7F3D0', text: '#334155' },
    warning: { bg: '#FEF3C7', border: '#FCD34D', text: '#334155' },
    highlight: { bg: '#FCE7F3', border: '#F9A8D4', text: '#334155' },
  }

  const colorScheme = colors[type] || colors.info

  return (
    <div style={{
      backgroundColor: colorScheme.bg,
      border: `1px solid ${colorScheme.border}`,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
    }}>
      {title && (
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: colorScheme.text,
          margin: '0 0 8px 0',
        }}>
          {title}
        </h4>
      )}
      <div style={{
        fontSize: '14px',
        color: colorScheme.text,
        lineHeight: '1.6',
      }}>
        {content}
      </div>
    </div>
  )
}

export default InfoBox
