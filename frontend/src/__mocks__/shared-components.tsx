import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export const Button = ({ children, className, ...props }: ButtonProps) => (
  <button className={`sc-button ${className || ''}`} {...props}>
    {children}
  </button>
)

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = ({ label, error, className, id, ...props }: InputProps) => (
  <div className="sc-input-wrapper">
    {label && <label htmlFor={id}>{label}</label>}
    <input
      id={id}
      className={`sc-input ${error ? 'sc-input--error' : ''} ${className || ''}`}
      {...props}
    />
    {error && <span className="sc-input-error">{error}</span>}
  </div>
)

export interface ChatBubbleProps {
  from: 'user' | 'bot'
  text: string
}

export const ChatBubble = ({ from, text }: ChatBubbleProps) => (
  <div className={`sc-chat-bubble sc-chat-bubble--${from}`}>{text}</div>
)

export interface ChatContainerProps {
  children: ReactNode
}

export const ChatContainer = ({ children }: ChatContainerProps) => (
  <div className="sc-chat-container">{children}</div>
)

export interface OptionButtonsProps {
  options: string[]
  onSelect: (option: string) => void
}

export const OptionButtons = ({ options, onSelect }: OptionButtonsProps) => (
  <div className="sc-option-buttons">
    {options.map((option) => (
      <button
        key={option}
        type="button"
        className="sc-option-button"
        onClick={() => onSelect(option)}
      >
        {option}
      </button>
    ))}
  </div>
)

export interface StepIndicatorProps {
  current: number
  total: number
}

export const StepIndicator = ({ current, total }: StepIndicatorProps) => {
  const step = Math.min(current + 1, total)
  const progress = Math.min((current / total) * 100, 100)
  return (
    <div className="sc-step-indicator">
      <div className="sc-step-bar">
        <div className="sc-step-progress" style={{ width: `${progress}%` }} />
      </div>
      <span className="sc-step-text">Вопрос {step} из {total}</span>
    </div>
  )
}

export const TypingIndicator = () => (
  <div className="sc-typing-indicator">
    <span className="sc-typing-dot" />
    <span className="sc-typing-dot" />
    <span className="sc-typing-dot" />
  </div>
)

export const Loader = () => (
  <div className="sc-loader">
    <div className="sc-loader-spinner" />
    <span className="sc-loader-text">Загрузка...</span>
  </div>
)

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null
  return (
    <div className="sc-modal-overlay" onClick={onClose}>
      <div className="sc-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="sc-modal-close" onClick={onClose}>✕</button>
        {title && <h2 className="sc-modal-title">{title}</h2>}
        <div className="sc-modal-content">{children}</div>
      </div>
    </div>
  )
}

export const Capsule = () => (
  <div className="capsule-container">
    <div className="capsule">
      <div className="capsule-top" />
      <div className="capsule-bottom" />
    </div>
  </div>
)
