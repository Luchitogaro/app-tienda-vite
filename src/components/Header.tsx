import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { theme, toggle } = useTheme()
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <header className={`header ${theme}`}>
      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/cart">Carrito ({count})</Link>
      </nav>
      <button onClick={toggle}>Tema: {theme}</button>
    </header>
  )
}

