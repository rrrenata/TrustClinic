import { render, screen } from '@testing-library/react'
import { StepIndicator } from './StepIndicator'

describe('StepIndicator', () => {
  it('renders current step info', () => {
    render(<StepIndicator current={0} total={10} />)
    expect(screen.getByText('Вопрос 1 из 10')).toBeInTheDocument()
  })

  it('shows correct step number (1-indexed)', () => {
    render(<StepIndicator current={4} total={10} />)
    expect(screen.getByText('Вопрос 5 из 10')).toBeInTheDocument()
  })

  it('caps step at total', () => {
    render(<StepIndicator current={15} total={10} />)
    expect(screen.getByText('Вопрос 10 из 10')).toBeInTheDocument()
  })

  it('has correct wrapper class', () => {
    render(<StepIndicator current={0} total={5} />)
    const wrapper = document.querySelector('.sc-step-indicator')
    expect(wrapper).toBeInTheDocument()
  })

  it('has progress bar', () => {
    render(<StepIndicator current={0} total={5} />)
    const bar = document.querySelector('.sc-step-bar')
    expect(bar).toBeInTheDocument()
  })

  it('has progress element', () => {
    render(<StepIndicator current={2} total={10} />)
    const progress = document.querySelector('.sc-step-progress')
    expect(progress).toBeInTheDocument()
  })

  it('calculates progress width at 0%', () => {
    render(<StepIndicator current={0} total={10} />)
    const progress = document.querySelector('.sc-step-progress') as HTMLElement
    expect(progress.style.width).toBe('0%')
  })

  it('calculates progress width at 50%', () => {
    render(<StepIndicator current={5} total={10} />)
    const progress = document.querySelector('.sc-step-progress') as HTMLElement
    expect(progress.style.width).toBe('50%')
  })

  it('calculates progress width at 100%', () => {
    render(<StepIndicator current={10} total={10} />)
    const progress = document.querySelector('.sc-step-progress') as HTMLElement
    expect(progress.style.width).toBe('100%')
  })

  it('caps progress at 100%', () => {
    render(<StepIndicator current={15} total={10} />)
    const progress = document.querySelector('.sc-step-progress') as HTMLElement
    expect(progress.style.width).toBe('100%')
  })

  it('has text element', () => {
    render(<StepIndicator current={0} total={5} />)
    const text = document.querySelector('.sc-step-text')
    expect(text).toBeInTheDocument()
  })
})
