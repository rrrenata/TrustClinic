import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders without label', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })

  it('displays error message', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('applies error class when error exists', () => {
    render(<Input error="Error" />)
    expect(screen.getByRole('textbox')).toHaveClass('sc-input--error')
  })

  it('does not apply error class when no error', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).not.toHaveClass('sc-input--error')
  })

  it('handles onChange events', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('passes through placeholder', () => {
    render(<Input placeholder="Enter email" />)
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('passes through type prop', () => {
    render(<Input type="password" />)
    expect(screen.getByRole('textbox').closest('input')).toHaveAttribute('type', 'password')
  })

  it('uses provided id', () => {
    render(<Input id="custom-id" label="Test" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'custom-id')
  })

  it('generates id when not provided', () => {
    render(<Input label="Test" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id')
  })

  it('links label to input via htmlFor', () => {
    render(<Input id="test-id" label="Test Label" />)
    const label = screen.getByText('Test Label')
    expect(label).toHaveAttribute('for', 'test-id')
  })

  it('can be disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('can be required', () => {
    render(<Input required />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('accepts value prop', () => {
    render(<Input value="test value" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveValue('test value')
  })
})
