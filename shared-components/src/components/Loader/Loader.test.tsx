import { render, screen } from '@testing-library/react'
import { Loader } from './Loader'

describe('Loader', () => {
  it('renders without crashing', () => {
    const { container } = render(<Loader />)
    expect(container).toBeInTheDocument()
  })

  it('has correct wrapper class', () => {
    render(<Loader />)
    const wrapper = document.querySelector('.sc-loader')
    expect(wrapper).toBeInTheDocument()
  })

  it('has spinner element', () => {
    render(<Loader />)
    const spinner = document.querySelector('.sc-loader-spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('displays loading text', () => {
    render(<Loader />)
    expect(screen.getByText('Загрузка...')).toBeInTheDocument()
  })

  it('has text element with correct class', () => {
    render(<Loader />)
    const text = document.querySelector('.sc-loader-text')
    expect(text).toBeInTheDocument()
  })
})
