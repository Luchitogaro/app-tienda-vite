import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

export default function Products() {
  const { products, loading, error } = useProducts()
  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <section className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  )
}

