import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    )
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    )
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Title">
        <div>Content</div>
      </Modal>
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('does not render title when not provided', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    )
    const title = document.querySelector('.sc-modal-title')
    expect(title).not.toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    )
    fireEvent.click(screen.getByText('✕'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when overlay clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    )
    const overlay = document.querySelector('.sc-modal-overlay')
    fireEvent.click(overlay!)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when modal content clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    )
    const modal = document.querySelector('.sc-modal')
    fireEvent.click(modal!)
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('has overlay class', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    )
    const overlay = document.querySelector('.sc-modal-overlay')
    expect(overlay).toBeInTheDocument()
  })

  it('has modal class', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    )
    const modal = document.querySelector('.sc-modal')
    expect(modal).toBeInTheDocument()
  })

  it('has content class', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    )
    const content = document.querySelector('.sc-modal-content')
    expect(content).toBeInTheDocument()
  })

  it('close button has correct type', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Modal>
    )
    const closeButton = screen.getByText('✕')
    expect(closeButton).toHaveAttribute('type', 'button')
  })

  it('renders children correctly', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </Modal>
    )
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument()
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument()
  })
})
