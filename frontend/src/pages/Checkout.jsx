import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Checkout() {
  const navigate = useNavigate()

  const { cart, totalItems, subtotal, clearCart } = useCart()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  })

  const [payment, setPayment] = useState('Cash on Delivery')

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const placeOrder = (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert('Your cart is empty!')
      navigate('/products')
      return
    }

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert('Please fill all delivery details.')
      return
    }

    const order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      totalItems,
      total: subtotal,
      customer: form,
      payment,
      status: 'Order Placed',
      date: new Date().toLocaleString()
    }

    const previousOrders =
      JSON.parse(localStorage.getItem('shopai-orders')) || []

    localStorage.setItem(
      'shopai-orders',
      JSON.stringify([...previousOrders, order])
    )

    clearCart()

    navigate('/order-success')
  }

  return (
    <main className="min-h-screen bg-[#F5F3EE] px-5 py-10 text-[#17181C] md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <button
          onClick={() => navigate('/cart')}
          className="mb-10 text-sm font-medium text-[#68697A] transition hover:text-[#17181C]"
        >
          ← Back to Cart
        </button>

        <div className="mb-12 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#7469D9]">
              ShopAI Checkout
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.05em] md:text-7xl">
              Almost
              <br />
              <span className="text-[#7469D9]">yours.</span>
            </h1>
          </div>

          <div className="max-w-sm lg:justify-self-end">
            <p className="text-lg leading-7 text-[#68697A]">
              One last step. Add your delivery details and choose how you'd
              like to pay.
            </p>
          </div>

        </div>

        <form
          onSubmit={placeOrder}
          className="grid gap-6 lg:grid-cols-[1.45fr_0.75fr]"
        >

          <div className="space-y-6">

            <section className="rounded-[30px] bg-white p-7 shadow-[0_15px_50px_rgba(25,25,35,0.05)] md:p-9">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8B8C9A]">
                    01
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight">
                    Delivery details
                  </h2>
                </div>

                <div className="rounded-full bg-[#D9D5FF] px-4 py-2 text-xs font-bold text-[#5148A8]">
                  Required
                </div>

              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">

                <div>
                  <label className="text-sm font-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-2xl border border-[#E5E2DC] bg-[#F8F7F3] px-4 py-4 text-[#17181C] outline-none transition placeholder:text-[#A0A0AA] focus:border-[#8B82E8] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="mt-2 w-full rounded-2xl border border-[#E5E2DC] bg-[#F8F7F3] px-4 py-4 text-[#17181C] outline-none transition placeholder:text-[#A0A0AA] focus:border-[#8B82E8] focus:bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold">
                    Delivery Address
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House number, street, area..."
                    rows="4"
                    className="mt-2 w-full resize-none rounded-2xl border border-[#E5E2DC] bg-[#F8F7F3] px-4 py-4 text-[#17181C] outline-none transition placeholder:text-[#A0A0AA] focus:border-[#8B82E8] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    className="mt-2 w-full rounded-2xl border border-[#E5E2DC] bg-[#F8F7F3] px-4 py-4 text-[#17181C] outline-none transition placeholder:text-[#A0A0AA] focus:border-[#8B82E8] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    className="mt-2 w-full rounded-2xl border border-[#E5E2DC] bg-[#F8F7F3] px-4 py-4 text-[#17181C] outline-none transition placeholder:text-[#A0A0AA] focus:border-[#8B82E8] focus:bg-white"
                  />
                </div>

              </div>

            </section>

            <section className="rounded-[30px] bg-[#D9F1E5] p-7 md:p-9">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#527664]">
                  02
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight">
                  Payment method
                </h2>
              </div>

              <div className="mt-7 grid gap-3">

                <label
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition ${
                    payment === 'Cash on Delivery'
                      ? 'border-[#17181C] bg-white'
                      : 'border-[#B9D8C7] bg-white/50 hover:bg-white'
                  }`}
                >
                  <div>
                    <p className="font-bold">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-sm text-[#68786F]">
                      Pay when your order arrives
                    </p>
                  </div>

                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={payment === 'Cash on Delivery'}
                    onChange={(e) => setPayment(e.target.value)}
                    className="h-5 w-5 accent-[#17181C]"
                  />
                </label>

                <label
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition ${
                    payment === 'UPI'
                      ? 'border-[#17181C] bg-white'
                      : 'border-[#B9D8C7] bg-white/50 hover:bg-white'
                  }`}
                >
                  <div>
                    <p className="font-bold">
                      UPI
                    </p>

                    <p className="mt-1 text-sm text-[#68786F]">
                      Google Pay, PhonePe, Paytm
                    </p>
                  </div>

                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={payment === 'UPI'}
                    onChange={(e) => setPayment(e.target.value)}
                    className="h-5 w-5 accent-[#17181C]"
                  />
                </label>

                <label
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition ${
                    payment === 'Card'
                      ? 'border-[#17181C] bg-white'
                      : 'border-[#B9D8C7] bg-white/50 hover:bg-white'
                  }`}
                >
                  <div>
                    <p className="font-bold">
                      Credit / Debit Card
                    </p>

                    <p className="mt-1 text-sm text-[#68786F]">
                      Visa, Mastercard and more
                    </p>
                  </div>

                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={payment === 'Card'}
                    onChange={(e) => setPayment(e.target.value)}
                    className="h-5 w-5 accent-[#17181C]"
                  />
                </label>

              </div>

            </section>

          </div>

          <aside className="h-fit rounded-[30px] bg-[#D9D5FF] p-7 md:p-9 lg:sticky lg:top-28">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6259AE]">
                  Your order
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Summary.
                </h2>
              </div>

              <div className="rounded-full bg-white px-4 py-2 text-sm font-bold">
                {totalItems} items
              </div>

            </div>

            <div className="mt-8 space-y-3">

              <div className="flex justify-between text-sm text-[#65647A]">
                <span>Items</span>
                <span className="font-semibold text-[#17181C]">
                  {totalItems}
                </span>
              </div>

              <div className="flex justify-between text-sm text-[#65647A]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#17181C]">
                  ₹{subtotal}
                </span>
              </div>

              <div className="flex justify-between text-sm text-[#65647A]">
                <span>Delivery</span>
                <span className="font-bold text-[#4D8066]">
                  FREE
                </span>
              </div>

            </div>

            <div className="my-7 h-px bg-[#BEB9EB]" />

            <div className="flex items-end justify-between">

              <div>
                <p className="text-sm font-semibold text-[#65647A]">
                  Total
                </p>

                <p className="mt-1 text-4xl font-black tracking-tight">
                  ₹{subtotal}
                </p>
              </div>

              <span className="mb-1 rounded-full bg-[#FFD9C7] px-3 py-1 text-xs font-bold text-[#875D48]">
                Secure
              </span>

            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-[#17181C] px-6 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#292A30]"
            >
              Place Order →
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#68667D]">
              Your order details are stored securely for your ShopAI account.
            </p>

          </aside>

        </form>

      </div>
    </main>
  )
}

export default Checkout