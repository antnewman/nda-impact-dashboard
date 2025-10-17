/**
 * DownloadButton - Button component for downloading files
 * Handles different file types and provides visual feedback on hover
 */
function DownloadButton({ label, fileType, onClick, icon = '↓' }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#D946EF',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#C026D3'
        e.target.style.transform = 'translateY(-1px)'
        e.target.style.boxShadow = '0 4px 6px rgba(217, 70, 239, 0.25)'
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#D946EF'
        e.target.style.transform = 'translateY(0)'
        e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {fileType && (
        <span style={{
          fontSize: '12px',
          opacity: 0.9,
          textTransform: 'uppercase',
        }}>
          ({fileType})
        </span>
      )}
    </button>
  )
}

export default DownloadButton
