import { render } from '@testing-library/react'
import { TypingIndicator } from './TypingIndicator'

describe('TypingIndicator', () => {
  it('renders without crashing', () => {
    const { container } = render(<TypingIndicator />)
    expect(container).toBeInTheDocument()
  })

  it('has correct wrapper class', () => {
    render(<TypingIndicator />)
    const wrapper = document.querySelector('.sc-typing-indicator')
    expect(wrapper).toBeInTheDocument()
  })

  it('renders three dots', () => {
    render(<TypingIndicator />)
    const dots = document.querySelectorAll('.sc-typing-dot')
    expect(dots).toHaveLength(3)
  })

  it('all dots have correct class', () => {
    render(<TypingIndicator />)
    const dots = document.querySelectorAll('.sc-typing-dot')
    dots.forEach(dot => {
      expect(dot).toHaveClass('sc-typing-dot')
    })
  })

  it('dots are span elements', () => {
    render(<TypingIndicator />)
    const dots = document.querySelectorAll('.sc-typing-dot')
    dots.forEach(dot => {
      expect(dot.tagName).toBe('SPAN')
    })
  })
})
