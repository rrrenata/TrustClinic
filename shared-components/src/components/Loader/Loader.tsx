import './Loader.css'

export function Loader() {
  return (
    <div className="sc-loader">
      <div className="sc-loader-spinner" />
      <span className="sc-loader-text">Загрузка...</span>
    </div>
  )
}
