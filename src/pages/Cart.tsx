import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, total, updateQuantity, remove, clear } = useCart()
  if (!items.length) return <p>Carrito vacío</p>
  return (
    <section>
      {items.map((i) => (
        <div key={i.id} className="row">
          <span>{i.title}</span>
          <span>${i.price}</span>
          <div>
            <button onClick={() => updateQuantity(i.id, i.quantity - 1)}>-</button>
            <span style={{ margin: '0 8px' }}>{i.quantity}</span>
            <button onClick={() => updateQuantity(i.id, i.quantity + 1)}>+</button>
          </div>
          <button onClick={() => remove(i.id)}>Eliminar</button>
        </div>
      ))}
      <hr />
      <p>Total: <strong>${total.toFixed(2)}</strong></p>
      <button onClick={clear}>Vaciar carrito</button>
    </section>
  )
}

