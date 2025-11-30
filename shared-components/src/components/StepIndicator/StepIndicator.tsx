import './StepIndicator.css'

export interface StepIndicatorProps {
  current: number
  total: number
}

export function StepIndicator({ current, total }: StepIndicatorProps) {
  const progress = Math.min((current / total) * 100, 100)

  return (
    <div className="sc-step-indicator">
      <div className="sc-step-text">
        Вопрос {Math.min(current + 1, total)} из {total}
      </div>
      <div className="sc-step-bar">
        <div
          className="sc-step-progress"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
