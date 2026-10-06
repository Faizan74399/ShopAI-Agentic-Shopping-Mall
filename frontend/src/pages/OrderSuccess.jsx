import { useNavigate } from 'react-router-dom'

function OrderSuccess() {
  const navigate = useNavigate()

  const orders =
    JSON.parse(localStorage.getItem('shopai-orders')) || []

  const latestOrder = orders[orders.length - 1]

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 py-16 text-[#17181c]">
      <div className="mx-auto max-w-5xl">

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">

          <section className="rounded-[32px] bg-[#d9d5ff] p-8 md:p-12">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-sm">
              ✓
            </div>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.28em] text-[#6861b8]">
              SHOPAI / ORDER CONFIRMED
            </p>

            <h1 className="mt-5 max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">
              You're all
              <br />
              <span className="text-[#6d63df]">set.</span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-[#5f6070]">
              Your order has been placed successfully. We'll take it from here.
            </p>

            <div className="mt-12 rounded-[24px] bg-white/75 p-6">

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#777887]">
                  ORDER STATUS
                </span>

                <span className="rounded-full bg-[#d9f1e5] px-4 py-2 text-sm font-bold text-[#39705a]">
                  Confirmed
                </span>
              </div>

              {latestOrder && (
                <>
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a8b96]">
                      Order ID
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      {latestOrder.id}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a8b96]">
                        Items
                      </p>

                      <p className="mt-2 font-bold">
                        {latestOrder.totalItems}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a8b96]">
                        Payment
                      </p>

                      <p className="mt-2 font-bold">
                        {latestOrder.payment}
                      </p>
                    </div>

                  </div>
                </>
              )}

            </div>

          </section>

          <section className="flex flex-col rounded-[32px] bg-white p-8 shadow-sm md:p-10">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7067d9]">
                YOUR ORDER
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">
                Everything's
                <br />
                <span className="text-[#7067d9]">good.</span>
              </h2>
            </div>

            {latestOrder && (
              <div className="mt-10">

                <div className="flex justify-between border-b border-[#ebe9e3] pb-5">
                  <span className="text-[#858691]">
                    Items
                  </span>

                  <span className="font-semibold">
                    {latestOrder.totalItems}
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#ebe9e3] py-5">
                  <span className="text-[#858691]">
                    Payment
                  </span>

                  <span className="font-semibold">
                    {latestOrder.payment}
                  </span>
                </div>

                <div className="flex justify-between pt-6">
                  <span className="text-lg font-bold">
                    Total
                  </span>

                  <span className="text-3xl font-black">
                    ₹{latestOrder.total}
                  </span>
                </div>

              </div>
            )}

            <div className="mt-auto pt-10">

              <button
                onClick={() => navigate('/orders')}
                className="w-full rounded-full bg-[#17181c] px-6 py-4 font-semibold text-white transition hover:bg-[#303139]"
              >
                View my orders →
              </button>

              <button
                onClick={() => navigate('/products')}
                className="mt-3 w-full rounded-full border border-[#dddcd7] bg-white px-6 py-4 font-semibold text-[#17181c] transition hover:bg-[#f5f3ee]"
              >
                Continue shopping
              </button>

            </div>

          </section>

        </div>

        <div className="mt-8 rounded-[28px] bg-[#ffd9c7] px-8 py-7 md:flex md:items-center md:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a0644c]">
              SHOPAI NOTE
            </p>

            <p className="mt-2 text-xl font-bold">
              Your next smart purchase is just a search away.
            </p>
          </div>

          <button
            onClick={() => navigate('/products')}
            className="mt-5 rounded-full bg-white px-6 py-3 font-semibold md:mt-0"
          >
            Explore products
          </button>

        </div>

      </div>
    </main>
  )
}

export default OrderSuccess