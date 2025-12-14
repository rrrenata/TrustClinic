import './ChatBubble.css'

export interface ChatBubbleProps {
  from: 'user' | 'bot'
  text: string
}

export function ChatBubble({ from, text }: ChatBubbleProps) {
  return (
    <div className={`sc-chat-bubble sc-chat-bubble--${from}`}>
      {text}
    </div>
  )
}
