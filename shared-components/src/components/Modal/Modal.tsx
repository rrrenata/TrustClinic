import { ReactNode } from 'react'
import './Modal.css'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="sc-modal-overlay" onClick={onClose}>
      <div className="sc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sc-modal-header">
          {title && <h3 className="sc-modal-title">{title}</h3>}
          <button className="sc-modal-close" onClick={onClose} type="button">
            ✕
          </button>
        </div>
        <div className="sc-modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}
