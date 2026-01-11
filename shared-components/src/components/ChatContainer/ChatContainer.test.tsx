import { render, screen } from '@testing-library/react'
import { ChatContainer } from './ChatContainer'

describe('ChatContainer', () => {
  it('renders children', () => {
    render(
      <ChatContainer>
        <div>Child content</div>
      </ChatContainer>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('has correct class', () => {
    render(
      <ChatContainer>
        <span>Test</span>
      </ChatContainer>
    )
    const container = document.querySelector('.sc-chat-container')
    expect(container).toBeInTheDocument()
  })

  it('renders multiple children', () => {
    render(
      <ChatContainer>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </ChatContainer>
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
  })

  it('renders nested elements', () => {
    render(
      <ChatContainer>
        <div>
          <span>Nested content</span>
        </div>
      </ChatContainer>
    )
    expect(screen.getByText('Nested content')).toBeInTheDocument()
  })

  it('renders with no children', () => {
    render(<ChatContainer>{null}</ChatContainer>)
    const container = document.querySelector('.sc-chat-container')
    expect(container).toBeInTheDocument()
  })
})
