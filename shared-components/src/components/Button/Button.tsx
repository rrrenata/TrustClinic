import { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = 'sc-button'
  const variantClass = variant === 'secondary' ? 'sc-button--secondary' : ''

  return (
    <button
      className={`${baseClass} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
