import { useNavigate } from 'react-router-dom'

function Orders() {
  const navigate = useNavigate()

  const orders =
    JSON.parse(localStorage.getItem('shopai-orders')) || []

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 py-14 text-[#17181c] md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7167c8]">
              ShopAI / Order history
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] md:text-7xl">
              My orders<span className="text-[#7167c8]">.</span>
            </h1>

            <p className="mt-4 max-w-xl text-[#777985]">
              Keep track of everything you've ordered through ShopAI.
            </p>
          </div>

          <button
            onClick={() => navigate('/products')}
            className="w-fit rounded-full bg-[#17181c] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5"
          >
            Continue shopping →
          </button>
        </div>

        {orders.length === 0 ? (
          <section className="mt-12 rounded-[32px] bg-[#d9d5ff] p-10 text-center md:p-16">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl">
              📦
            </div>

            <h2 className="mt-7 text-3xl font-black tracking-tight">
              No orders yet.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[#656579]">
              Once you place an order, your shopping history will appear here.
            </p>

            <button
              onClick={() => navigate('/products')}
              className="mt-8 rounded-full bg-[#17181c] px-7 py-4 font-semibold text-white"
            >
              Start shopping →
            </button>

          </section>
        ) : (
          <div className="mt-12 space-y-6">

            {[...orders].reverse().map((order, index) => (
              <article
                key={order.id}
                className="overflow-hidden rounded-[30px] bg-white shadow-[0_12px_40px_rgba(30,28,40,0.05)]"
              >

                <div className="grid gap-6 p-7 md:grid-cols-[1fr_auto_auto] md:items-center md:p-8">

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9d5ff] text-sm font-black text-[#5e56aa]">
                        {orders.length - index}
                      </span>

                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#898a95]">
                        Order
                      </p>
                    </div>

                    <h2 className="mt-4 text-lg font-black">
                      {order.id}
                    </h2>

                    <p className="mt-2 text-sm text-[#898a95]">
                      {order.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#898a95]">
                      Status
                    </p>

                    <span className="mt-2 inline-flex rounded-full bg-[#d9f1e5] px-4 py-2 text-sm font-bold text-[#39705a]">
                      {order.status}
                    </span>
                  </div>

                  <div className="md:text-right">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#898a95]">
                      Total
                    </p>

                    <p className="mt-2 text-2xl font-black">
                      ₹{order.total}
                    </p>
                  </div>

                </div>

                <div className="border-t border-[#eceae4] bg-[#faf9f6] px-7 py-6 md:px-8">

                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                    <p className="text-sm font-semibold text-[#676875]">
                      {order.totalItems} {order.totalItems === 1 ? 'item' : 'items'}
                      <span className="mx-2 text-[#c2c1bc]">·</span>
                      {order.payment}
                    </p>

                    <p className="text-sm font-semibold text-[#676875]">
                      {order.customer?.city || 'Delivery address saved'}
                    </p>

                  </div>

                  <div className="mt-5 grid gap-3">

                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl bg-white px-4 py-4"
                      >

                        <div className="flex min-w-0 items-center gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ffd9c7] text-2xl">
                            {item.emoji}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-bold">
                              {item.name}
                            </p>

                            <p className="mt-1 text-xs text-[#92929b]">
                              ₹{item.price} each
                            </p>
                          </div>

                        </div>

                        <span className="ml-4 shrink-0 rounded-full bg-[#f5f3ee] px-3 py-1 text-sm font-bold">
                          × {item.quantity}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>

              </article>
            ))}

          </div>
        )}

      </div>
    </main>
  )
}

export default Orders