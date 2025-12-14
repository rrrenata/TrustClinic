import './OptionButtons.css'

export interface OptionButtonsProps {
  options: string[]
  onSelect: (option: string) => void
}

export function OptionButtons({ options, onSelect }: OptionButtonsProps) {
  return (
    <div className="sc-option-buttons">
      {options.map((option) => (
        <button
          key={option}
          className="sc-option-button"
          onClick={() => onSelect(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
