import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

// Mock Supabase client
vi.mock('./supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => Promise.resolve({
        data: [
          {
            id: 1,
            sector: 'Technology',
            nda_signed: true,
            impact_mental_health: 8,
            impact_career: 7,
            impact_financial: 6,
            impact_isolation: 7,
            impact_fear_speaking: 9,
            repeat_offender: true,
            years_since_signing: 5,
            organisation_size: 'Large',
          },
        ],
        error: null,
      })),
    })),
  },
}))

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders header with correct branding', async () => {
    render(<App />)

    expect(screen.getByText('Breaking the Silence')).toBeInTheDocument()
    expect(screen.getByText('Data Evidence to Make NDA Reform Watertight')).toBeInTheDocument()
    expect(screen.getByText(/A Tortoise AI project/i)).toBeInTheDocument()
  })

  it('renders all navigation tabs', () => {
    render(<App />)

    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Sectors')).toBeInTheDocument()
    expect(screen.getByText('Impact')).toBeInTheDocument()
    expect(screen.getByText('Evidence')).toBeInTheDocument()
    expect(screen.getByText('Insights')).toBeInTheDocument()
  })

  it('Overview tab is active by default', () => {
    render(<App />)

    const overviewTab = screen.getByText('Overview')
    expect(overviewTab).toHaveClass('active')
  })

  it('switches tabs when clicked', async () => {
    render(<App />)

    const sectorsTab = screen.getByText('Sectors')
    fireEvent.click(sectorsTab)

    expect(sectorsTab).toHaveClass('active')
    expect(screen.getByText('Overview')).not.toHaveClass('active')
  })

  it('renders footer with attribution', () => {
    render(<App />)

    expect(screen.getByText(/Built by/i)).toBeInTheDocument()
    expect(screen.getByText(/Tortoise AI/i)).toBeInTheDocument()
    expect(screen.getByText(/Data attribution to Speak Out Revolution/i)).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    render(<App />)

    // Should show loading text in the active tab
    expect(screen.getByText(/Loading overview data/i)).toBeInTheDocument()
  })

  it('fetches data on mount', async () => {
    const { supabase } = await import('./supabaseClient')

    render(<App />)

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('nda_responses')
    })
  })

  it('displays error message when fetch fails', async () => {
    // Mock error response
    const { supabase } = await import('./supabaseClient')
    supabase.from = vi.fn(() => ({
      select: vi.fn(() => Promise.resolve({
        data: null,
        error: { message: 'Network error' },
      })),
    }))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Error loading data: Network error/i)).toBeInTheDocument()
    })
  })

  it('all tabs are accessible and render without crashing', async () => {
    render(<App />)

    const tabs = ['Overview', 'Sectors', 'Impact', 'Evidence', 'Insights']

    for (const tabName of tabs) {
      const tab = screen.getByText(tabName)
      fireEvent.click(tab)

      // Wait for tab content to render
      await waitFor(() => {
        expect(tab).toHaveClass('active')
      })
    }
  })
})
