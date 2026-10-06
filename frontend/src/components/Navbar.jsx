import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const location = useLocation()
  const { cart } = useCart()

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 border-b border-[#deddd8] bg-[#f7f5ef]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcd7ff] text-lg font-black text-[#18181b]">
            S
          </div>

          <div>
            <div className="text-[20px] font-black tracking-[-0.04em] text-[#18181b]">
              ShopAI
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#77777f]">
              Intelligent Shopping
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className={`text-sm font-semibold transition ${
              location.pathname === '/'
                ? 'text-[#18181b]'
                : 'text-[#77777f] hover:text-[#18181b]'
            }`}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`text-sm font-semibold transition ${
              location.pathname.startsWith('/products')
                ? 'text-[#18181b]'
                : 'text-[#77777f] hover:text-[#18181b]'
            }`}
          >
            Shop
          </Link>

          <Link
            to="/orders"
            className={`text-sm font-semibold transition ${
              location.pathname === '/orders'
                ? 'text-[#18181b]'
                : 'text-[#77777f] hover:text-[#18181b]'
            }`}
          >
            Orders
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="group flex items-center gap-2 rounded-full border border-[#d8d7d1] bg-white px-4 py-2.5 text-sm font-bold text-[#18181b] transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span>Cart</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ffd9c7] px-1.5 text-xs font-black">
              {cartCount}
            </span>
          </Link>

          <button className="hidden rounded-full bg-[#18181b] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#303035] sm:block">
            Ask AI
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar