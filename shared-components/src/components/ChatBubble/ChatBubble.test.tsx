import { render, screen } from '@testing-library/react'
import { ChatBubble } from './ChatBubble'

describe('ChatBubble', () => {
  it('renders text content', () => {
    render(<ChatBubble from="bot" text="Hello!" />)
    expect(screen.getByText('Hello!')).toBeInTheDocument()
  })

  it('applies bot class for bot messages', () => {
    render(<ChatBubble from="bot" text="Bot message" />)
    const bubble = screen.getByText('Bot message')
    expect(bubble).toHaveClass('sc-chat-bubble--bot')
  })

  it('applies user class for user messages', () => {
    render(<ChatBubble from="user" text="User message" />)
    const bubble = screen.getByText('User message')
    expect(bubble).toHaveClass('sc-chat-bubble--user')
  })

  it('has base class', () => {
    render(<ChatBubble from="bot" text="Test" />)
    expect(screen.getByText('Test')).toHaveClass('sc-chat-bubble')
  })

  it('renders long text correctly', () => {
    const longText = 'This is a very long message that should be displayed correctly in the chat bubble component'
    render(<ChatBubble from="user" text={longText} />)
    expect(screen.getByText(longText)).toBeInTheDocument()
  })

  it('renders special characters', () => {
    render(<ChatBubble from="bot" text="Hello! How are you? 😊" />)
    expect(screen.getByText('Hello! How are you? 😊')).toBeInTheDocument()
  })

  it('renders empty string', () => {
    render(<ChatBubble from="bot" text="" />)
    const bubble = document.querySelector('.sc-chat-bubble')
    expect(bubble).toBeInTheDocument()
  })

  it('renders with cyrillic text', () => {
    render(<ChatBubble from="bot" text="Привет, как дела?" />)
    expect(screen.getByText('Привет, как дела?')).toBeInTheDocument()
  })
})
