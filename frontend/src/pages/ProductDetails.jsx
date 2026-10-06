import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError('')

    fetch(`http://127.0.0.1:8000/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Product not found')
        }

        return response.json()
      })
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load this product.')
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f5ef] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="h-[600px] animate-pulse rounded-[36px] bg-[#e8e6df]" />
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#f7f5ef] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[700px] rounded-[36px] bg-[#ffd9c7] p-12 text-center">
          <div className="text-5xl">?</div>

          <h1 className="mt-5 text-4xl font-black tracking-[-0.05em]">
            Product not found.
          </h1>

          <p className="mt-3 text-[#8d6657]">
            We couldn't find the product you're looking for.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex rounded-full bg-[#18181b] px-6 py-3 text-sm font-bold text-white"
          >
            Back to marketplace
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#18181b]">
      
      <section className="mx-auto max-w-[1400px] px-6 pb-20 pt-12 lg:px-10 lg:pt-16">
        
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#77777f] transition hover:text-[#18181b]"
        >
          ← Back to marketplace
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          
          <div className="relative flex min-h-[620px] items-center justify-center overflow-hidden rounded-[36px] bg-[#dcd7ff]">
            
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#f5e6a8]" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#c8c0ff]" />

            <div className="absolute left-8 top-8 flex items-center gap-3">
              <span className="rounded-full bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.15em]">
                {product.category}
              </span>

              {product.organic === 1 && (
                <span className="rounded-full bg-[#18181b] px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-white">
                  Organic
                </span>
              )}
            </div>

            <div className="relative z-10 flex h-[360px] w-[360px] items-center justify-center rounded-full bg-white/65 shadow-sm backdrop-blur">
              <span className="text-[130px]">
                {product.emoji}
              </span>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5e5a91]">
                ShopAI product
              </span>

              <span className="text-xs font-bold text-[#5e5a91]">
                #{String(product.id).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[36px] bg-white p-8 sm:p-12 lg:p-14">
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#e0a52f]">★</span>

                <span className="text-sm font-black">
                  {product.rating}
                </span>

                <span className="text-sm text-[#9999a0]">
                  ({product.reviews} reviews)
                </span>
              </div>

              <h1 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-6xl">
                {product.name}
              </h1>

              <p className="mt-6 max-w-[550px] text-lg leading-8 text-[#77777f]">
                {product.description}
              </p>
            </div>

            <div className="mt-12">
              <div className="flex items-end justify-between border-b border-[#e7e6e2] pb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9999a0]">
                    Price
                  </p>

                  <p className="mt-2 text-4xl font-black tracking-[-0.05em]">
                    ₹{product.price}
                  </p>
                </div>

                {product.organic === 1 && (
                  <div className="rounded-full bg-[#d8f1e5] px-4 py-2 text-xs font-black text-[#557563]">
                    Naturally selected
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#f7f5ef] p-2">
                <span className="px-4 text-sm font-bold">
                  Quantity
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-black transition hover:bg-[#dcd7ff]"
                  >
                    −
                  </button>

                  <span className="flex h-10 w-10 items-center justify-center text-sm font-black">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((current) => current + 1)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-black transition hover:bg-[#dcd7ff]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_0.45fr]">
                <button
                  onClick={handleAddToCart}
                  className={`rounded-2xl px-6 py-4 text-sm font-black transition hover:-translate-y-1 ${
                    added
                      ? 'bg-[#d8f1e5] text-[#557563]'
                      : 'bg-[#18181b] text-white hover:bg-[#303035]'
                  }`}
                >
                  {added ? '✓ Added to cart' : 'Add to cart'}
                </button>

                <Link
                  to="/cart"
                  className="flex items-center justify-center rounded-2xl border border-[#deddd8] px-6 py-4 text-sm font-black transition hover:bg-[#f7f5ef]"
                >
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          
          <div className="rounded-[28px] bg-[#d8f1e5] p-8">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#557563]">
              01
            </span>

            <h2 className="mt-16 text-3xl font-black tracking-[-0.05em]">
              Rated by shoppers.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#61756a]">
              {product.rating} out of 5 based on {product.reviews} reviews.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#ffd9c7] p-8">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8d6657]">
              02
            </span>

            <h2 className="mt-16 text-3xl font-black tracking-[-0.05em]">
              Made for better choices.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#8d6657]">
              ShopAI keeps useful product information close to the decision.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#d8e8ff] p-8">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#59708f]">
              03
            </span>

            <h2 className="mt-16 text-3xl font-black tracking-[-0.05em]">
              One click away.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#65758c]">
              Add it to your cart and continue shopping whenever you're ready.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}

export default ProductDetails