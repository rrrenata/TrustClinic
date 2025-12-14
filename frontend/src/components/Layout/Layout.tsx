import type { ReactElement } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = (): ReactElement => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/about">О клинике</Link></li>
          <li><Link to="/diagnosis">Диагностика</Link></li>
          <li><Link to="/profile">Профиль</Link></li>
          <li><Link to="/login">Вход</Link></li>
          <li><Link to="/register">Регистрация</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
