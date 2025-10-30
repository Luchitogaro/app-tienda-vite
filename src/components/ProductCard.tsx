import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }: { product: any }) {
  const { add } = useCart()
  return (
    <article className="card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} width={160} />
        <h3>{product.title}</h3>
      </Link>
      <p><strong>${product.price}</strong></p>
      <button onClick={() => add({ id: product.id, title: product.title, price: product.price, image: product.image })}>Agregar</button>
    </article>
  )
}

