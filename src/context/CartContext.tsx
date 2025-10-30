import { createContext, useContext, useMemo, useReducer } from 'react'

type Item = { id: number; title: string; price: number; image?: string; quantity: number }
type State = { items: Item[]; total: number }
type Action =
  | { type: 'ADD'; payload: Omit<Item, 'quantity'> }
  | { type: 'REMOVE'; payload: { id: number } }
  | { type: 'UPDATE_QTY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR' }

const initial: State = { items: [], total: 0 }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.payload.id)
      const items = exists
        ? state.items.map(i => (i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...state.items, { ...action.payload, quantity: 1 }]
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
      return { items, total }
    }
    case 'REMOVE': {
      const items = state.items.filter(i => i.id !== action.payload.id)
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
      return { items, total }
    }
    case 'UPDATE_QTY': {
      const items = state.items
        .map(i => (i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i))
        .filter(i => i.quantity > 0)
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
      return { items, total }
    }
    case 'CLEAR':
      return initial
    default:
      return state
  }
}

type CartContextValue = State & {
  add: (p: Omit<Item, 'quantity'>) => void
  remove: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial)
  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      add: p => dispatch({ type: 'ADD', payload: p }),
      remove: id => dispatch({ type: 'REMOVE', payload: { id } }),
      updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } }),
      clear: () => dispatch({ type: 'CLEAR' })
    }),
    [state]
  )
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}

