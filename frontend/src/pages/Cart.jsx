import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal
  } = useCart()

  const delivery = subtotal >= 999 || subtotal === 0 ? 0 : 49
  const total = subtotal + delivery

  if (cart.length === 0) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#F5F3EE] px-6 py-20 text-[#17181C]">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#716F87]">
            Your basket
          </p>

          <h1 className="text-6xl font-black tracking-[-0.06em] md:text-8xl">
            Your cart
            <span className="text-[#766BDB]">.</span>
          </h1>

          <div className="mt-12 rounded-[32px] bg-[#DCD7FF] p-10 md:p-16">
            <p className="text-2xl font-bold">Your cart is empty.</p>

            <p className="mt-3 max-w-md text-[#5F6070]">
              Find something you actually want and add it to your ShopAI cart.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-full bg-[#17181C] px-7 py-4 font-semibold text-white transition hover:scale-[1.02]"
            >
              Explore products →
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F5F3EE] px-6 py-14 text-[#17181C] md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#716F87]">
              ShopAI basket
            </p>

            <h1 className="text-6xl font-black tracking-[-0.06em] md:text-8xl">
              Your cart
              <span className="text-[#766BDB]">.</span>
            </h1>

            <p className="mt-5 text-[#666777]">
              {cart.length} {cart.length === 1 ? 'product' : 'products'} · {cart.reduce((total, item) => total + item.quantity, 0)} items
            </p>
          </div>

          <button
            onClick={clearCart}
            className="w-fit rounded-full border border-[#D8D5CE] bg-white px-5 py-3 text-sm font-semibold transition hover:bg-[#FFE0D2]"
          >
            Clear cart
          </button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <section className="space-y-4">
            {cart.map((item) => (
              <article
                key={item.id}
                className="rounded-[28px] bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[24px] bg-[#DCD7FF] text-5xl">
                    {item.emoji}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#777587]">
                          {item.category}
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight">
                          {item.name}
                        </h2>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-semibold text-[#8B6E68] hover:text-[#17181C]"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-xl font-black">
                        ₹{item.price}
                      </p>

                      <div className="flex items-center gap-2 rounded-full bg-[#F5F3EE] p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold transition hover:bg-[#DCD7FF]"
                        >
                          −
                        </button>

                        <span className="w-8 text-center font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold transition hover:bg-[#DCD7FF]"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-black">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-[32px] bg-[#DCD7FF] p-7 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#625C91]">
              Order summary
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Almost yours.
            </h2>

            <div className="mt-8 space-y-4 border-b border-[#BEB7EE] pb-6">
              <div className="flex justify-between text-[#555568]">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-[#555568]">
                <span>Delivery</span>
                <span className="font-semibold">
                  {delivery === 0 ? 'Free' : `₹${delivery}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-black">₹{total}</span>
            </div>

            <Link
              to="/checkout"
              className="mt-7 flex w-full items-center justify-center rounded-full bg-[#17181C] px-6 py-4 font-semibold text-white transition hover:scale-[1.01]"
            >
              Continue to checkout →
            </Link>

            <Link
              to="/products"
              className="mt-3 flex w-full items-center justify-center rounded-full border border-[#BEB7EE] bg-white/50 px-6 py-4 font-semibold transition hover:bg-white"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Cart