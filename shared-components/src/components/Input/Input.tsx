import { InputHTMLAttributes } from 'react'
import './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({
  label,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className="sc-input-wrapper">
      {label && (
        <label htmlFor={inputId} className="sc-input-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`sc-input ${error ? 'sc-input--error' : ''} ${className}`.trim()}
        {...props}
      />
      {error && <span className="sc-input-error">{error}</span>}
    </div>
  )
}
