import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('renders wrapper', () => {
    const { container } = render(<Input />)
    expect(container.querySelector('.sc-input-wrapper')).toBeInTheDocument()
  })

  it('renders input element', () => {
    const { container } = render(<Input />)
    expect(container.querySelector('input')).toBeInTheDocument()
  })

  it('applies className to input', () => {
    const { container } = render(<Input className="custom-class" />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('custom-class')
  })

  it('passes through placeholder prop', () => {
    render(<Input placeholder="Type here" />)
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
  })

  it('passes through value prop', () => {
    render(<Input value="hello" onChange={() => {}} />)
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument()
  })

  it('calls onChange handler', () => {
    const onChange = jest.fn()
    render(<Input onChange={onChange} />)

    const input = document.querySelector('input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'new value' } })

    expect(onChange).toHaveBeenCalled()
  })

  it('passes through type prop', () => {
    const { container } = render(<Input type="password" />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('uses provided id', () => {
    const { container } = render(<Input id="my-id" />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('id', 'my-id')
  })

  it('generates an id if not provided', () => {
    const { container } = render(<Input />)
    const input = container.querySelector('input')
    expect(input?.getAttribute('id')).toMatch(/^input-/)
  })

  it('renders a label when provided and links it to the input', () => {
    const { container } = render(<Input label="Email" />)

    const input = container.querySelector('input') as HTMLInputElement
    const label = screen.getByText('Email') as HTMLLabelElement

    expect(label).toBeInTheDocument()
    expect(label.tagName.toLowerCase()).toBe('label')
    expect(label).toHaveAttribute('for', input.id)
    expect(screen.getByLabelText('Email')).toBe(input)
  })

  it('renders error message and applies error styling when error is provided', () => {
    const { container } = render(<Input error="Required" />)

    const input = container.querySelector('input') as HTMLInputElement
    expect(input).toHaveClass('sc-input--error')
    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})
