import { ReactNode } from 'react'
import './ChatContainer.css'

export interface ChatContainerProps {
  children: ReactNode
}

export function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="sc-chat-container">
      {children}
    </div>
  )
}
