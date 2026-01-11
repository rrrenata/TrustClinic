import { render, screen, fireEvent } from '@testing-library/react'
import { OptionButtons } from './OptionButtons'

describe('OptionButtons', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3']
  const mockOnSelect = jest.fn()

  beforeEach(() => {
    mockOnSelect.mockClear()
  })

  it('renders all options', () => {
    render(<OptionButtons options={mockOptions} onSelect={mockOnSelect} />)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('calls onSelect with correct option when clicked', () => {
    render(<OptionButtons options={mockOptions} onSelect={mockOnSelect} />)
    fireEvent.click(screen.getByText('Option 2'))
    expect(mockOnSelect).toHaveBeenCalledWith('Option 2')
  })

  it('calls onSelect only once per click', () => {
    render(<OptionButtons options={mockOptions} onSelect={mockOnSelect} />)
    fireEvent.click(screen.getByText('Option 1'))
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  it('renders buttons with correct type', () => {
    render(<OptionButtons options={mockOptions} onSelect={mockOnSelect} />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('type', 'button')
    })
  })

  it('renders correct number of buttons', () => {
    render(<OptionButtons options={mockOptions} onSelect={mockOnSelect} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('has correct wrapper class', () => {
    render(<OptionButtons options={mockOptions} onSelect={mockOnSelect} />)
    const wrapper = document.querySelector('.sc-option-buttons')
    expect(wrapper).toBeInTheDocument()
  })

  it('buttons have correct class', () => {
    render(<OptionButtons options={mockOptions} onSelect={mockOnSelect} />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveClass('sc-option-button')
    })
  })

  it('renders empty when no options', () => {
    render(<OptionButtons options={[]} onSelect={mockOnSelect} />)
    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  it('renders single option', () => {
    render(<OptionButtons options={['Single']} onSelect={mockOnSelect} />)
    expect(screen.getByText('Single')).toBeInTheDocument()
  })

  it('handles cyrillic options', () => {
    const cyrillicOptions = ['Да', 'Нет', 'Не знаю']
    render(<OptionButtons options={cyrillicOptions} onSelect={mockOnSelect} />)
    expect(screen.getByText('Да')).toBeInTheDocument()
    expect(screen.getByText('Нет')).toBeInTheDocument()
    expect(screen.getByText('Не знаю')).toBeInTheDocument()
  })

  it('handles click on each option', () => {
    render(<OptionButtons options={mockOptions} onSelect={mockOnSelect} />)
    mockOptions.forEach(option => {
      fireEvent.click(screen.getByText(option))
    })
    expect(mockOnSelect).toHaveBeenCalledTimes(3)
  })
})
