import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatCard from './StatCard'

describe('StatCard Component', () => {
  it('renders title and value correctly', () => {
    render(<StatCard title="Test Stat" value="42%" />)

    expect(screen.getByText('TEST STAT')).toBeInTheDocument()
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<StatCard title="Test" value="100" subtitle="responses" />)

    expect(screen.getByText('responses')).toBeInTheDocument()
  })

  it('applies custom color when provided', () => {
    render(
      <StatCard title="Test" value="50" color="#FF0000" />
    )

    const valueElement = screen.getByText('50')
    expect(valueElement).toHaveStyle({ color: '#FF0000' })
  })

  it('uses default color when not provided', () => {
    render(
      <StatCard title="Test" value="50" />
    )

    const valueElement = screen.getByText('50')
    expect(valueElement).toHaveStyle({ color: '#D946EF' })
  })

  it('does not render subtitle when not provided', () => {
    const { container } = render(
      <StatCard title="Test" value="50" />
    )

    const subtitleElements = container.querySelectorAll('p')
    expect(subtitleElements).toHaveLength(0)
  })
})
