import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DownloadButton from './DownloadButton'

describe('DownloadButton Component', () => {
  it('renders label correctly', () => {
    render(<DownloadButton label="Download Report" onClick={() => {}} />)

    expect(screen.getByText('Download Report')).toBeInTheDocument()
  })

  it('displays file type when provided', () => {
    render(<DownloadButton label="Download" fileType="PDF" onClick={() => {}} />)

    expect(screen.getByText('(PDF)')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<DownloadButton label="Download" onClick={handleClick} />)

    const button = screen.getByText('Download')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('displays custom icon when provided', () => {
    render(<DownloadButton label="Download" icon="📄" onClick={() => {}} />)

    expect(screen.getByText('📄')).toBeInTheDocument()
  })

  it('displays default icon when not provided', () => {
    render(<DownloadButton label="Download" onClick={() => {}} />)

    expect(screen.getByText('↓')).toBeInTheDocument()
  })

  it('applies hover styles', () => {
    render(
      <DownloadButton label="Download" onClick={() => {}} />
    )

    const button = screen.getByRole('button')

    // Initial style
    expect(button).toHaveStyle({ backgroundColor: '#D946EF' })

    // Hover
    fireEvent.mouseEnter(button)
    expect(button).toHaveStyle({ backgroundColor: '#C026D3' })

    // Leave
    fireEvent.mouseLeave(button)
    expect(button).toHaveStyle({ backgroundColor: '#D946EF' })
  })
})
