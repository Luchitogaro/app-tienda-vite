export async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  if (!res.ok) throw new Error('Error al cargar productos')
  return res.json()
}

export async function getProduct(id: string | number) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!res.ok) throw new Error('Error al cargar producto')
  return res.json()
}

