import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProduct } from '../services/api'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { add } = useCart()

  useEffect(() => {
    if (!id) return
    getProduct(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>
  if (!product) return <p>No encontrado</p>

  return (
    <article>
      <img src={product.image} alt={product.title} width={220} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      <button onClick={() => add({ id: product.id, title: product.title, price: product.price, image: product.image })}>Agregar</button>
    </article>
  )
}

