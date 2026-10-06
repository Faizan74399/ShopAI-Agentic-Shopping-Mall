import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [minRating, setMinRating] = useState(0)
  const [organicOnly, setOrganicOnly] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        return response.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load products from the server.')
        setLoading(false)
      })
  }, [])

  const categories = useMemo(() => {
    return ['All', ...new Set(products.map((product) => product.category))]
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesCategory =
        category === 'All' || product.category === category

      const matchesPrice = product.price <= maxPrice

      const matchesRating = product.rating >= minRating

      const matchesOrganic =
        !organicOnly || product.organic === 1

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesOrganic
      )
    })

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviews - a.reviews)
    }

    return result
  }, [
    products,
    search,
    category,
    maxPrice,
    minRating,
    organicOnly,
    sortBy
  ])

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#18181b]">
      
      <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-16 lg:px-10 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-12 bg-[#18181b]" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#77777f]">
                ShopAI Marketplace
              </span>
            </div>

            <h1 className="max-w-[850px] text-[clamp(4rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em]">
              Find your
              <br />
              <span className="text-[#7771d9]">next favourite.</span>
            </h1>
          </div>

          <p className="max-w-[390px] text-lg leading-8 text-[#64656c]">
            Browse products, narrow your choices and let ShopAI help you
            find something worth adding to your cart.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-8 lg:px-10">
        <div className="rounded-[30px] bg-[#dcd7ff] p-5 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
            
            <div className="flex items-center rounded-2xl bg-white px-5 py-4">
              <span className="mr-3 text-lg">⌕</span>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent text-sm font-medium text-[#18181b] outline-none placeholder:text-[#9999a0]"
              />
            </div>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-2xl border-0 bg-white px-5 py-4 text-sm font-bold text-[#18181b] outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-2xl border-0 bg-white px-5 py-4 text-sm font-bold text-[#18181b] outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/70 px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#77777f]">
                  Max price
                </span>

                <span className="text-sm font-black">
                  ₹{maxPrice}
                </span>
              </div>

              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="mt-4 w-full accent-[#7771d9]"
              />
            </div>

            <div className="rounded-2xl bg-white/70 px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#77777f]">
                  Minimum rating
                </span>

                <span className="text-sm font-black">
                  {minRating === 0 ? 'Any' : `${minRating}+`}
                </span>
              </div>

              <select
                value={minRating}
                onChange={(event) => setMinRating(Number(event.target.value))}
                className="mt-3 w-full bg-transparent text-sm font-bold outline-none"
              >
                <option value="0">Any rating</option>
                <option value="4">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.7">4.7+</option>
                <option value="4.8">4.8+</option>
              </select>
            </div>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-white/70 px-5 py-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#77777f]">
                  Preference
                </div>

                <div className="mt-1 text-sm font-black">
                  Organic only
                </div>
              </div>

              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(event) => setOrganicOnly(event.target.checked)}
                className="h-5 w-5 accent-[#7771d9]"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#77777f]">
              Marketplace
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em]">
              {loading ? 'Finding products...' : `${filteredProducts.length} products`}
            </h2>
          </div>

          {!loading && (
            <button
              onClick={() => {
                setSearch('')
                setCategory('All')
                setMaxPrice(1000)
                setMinRating(0)
                setOrganicOnly(false)
                setSortBy('featured')
              }}
              className="text-sm font-bold text-[#7771d9] underline underline-offset-4"
            >
              Reset filters
            </button>
          )}
        </div>

        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[390px] animate-pulse rounded-[28px] bg-[#e8e6df]"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-[28px] bg-[#ffd9c7] p-10 text-center">
            <h3 className="text-2xl font-black">
              Something went wrong.
            </h3>

            <p className="mt-2 text-sm text-[#8d6657]">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="rounded-[32px] bg-[#d8e8ff] px-6 py-20 text-center">
            <div className="text-5xl">⌕</div>

            <h3 className="mt-5 text-3xl font-black tracking-[-0.04em]">
              Nothing matched.
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#65758c]">
              Try changing your search or relaxing one of the filters.
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product, index) => {
              const cardColors = [
                'bg-[#dcd7ff]',
                'bg-[#ffd9c7]',
                'bg-[#d8f1e5]',
                'bg-[#d8e8ff]'
              ]

              return (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group overflow-hidden rounded-[28px] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div
                    className={`relative flex h-64 items-center justify-center ${cardColors[index % 4]}`}
                  >
                    <div className="absolute left-5 top-5 rounded-full bg-white/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em]">
                      {product.category}
                    </div>

                    {product.organic === 1 && (
                      <div className="absolute right-5 top-5 rounded-full bg-[#18181b] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                        Organic
                      </div>
                    )}

                    <span className="text-7xl transition duration-300 group-hover:scale-110">
                      {product.emoji}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black tracking-[-0.04em]">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-[#85858b]">
                          {product.description}
                        </p>
                      </div>

                      <span className="shrink-0 text-lg font-black">
                        ₹{product.price}
                      </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#ecebe7] pt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[#18181b]">★</span>

                        <span className="text-sm font-bold">
                          {product.rating}
                        </span>

                        <span className="text-xs text-[#9999a0]">
                          ({product.reviews})
                        </span>
                      </div>

                      <span className="text-sm font-black text-[#7771d9]">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-8 lg:px-10">
        <div className="grid overflow-hidden rounded-[36px] bg-[#ffd9c7] lg:grid-cols-[1fr_0.55fr]">
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d6657]">
              ShopAI intelligence
            </p>

            <h2 className="mt-5 max-w-[700px] text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">
              Don’t just
              <br />
              search.
              <br />
              Describe.
            </h2>

            <p className="mt-7 max-w-[520px] text-base leading-7 text-[#8d6657]">
              Soon you’ll be able to tell ShopAI exactly what you need in
              natural language and let the agent find the best match.
            </p>
          </div>

          <div className="flex min-h-[300px] items-center justify-center bg-[#f6c7b2]">
            <div className="w-[250px] rounded-[28px] bg-[#f7f5ef] p-6 shadow-xl">
              <div className="mb-5 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#dcd7ff]" />
                <div>
                  <div className="text-xs font-black">ShopAI</div>
                  <div className="text-[10px] text-[#9999a0]">Assistant</div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#dcd7ff] p-4 text-sm font-bold leading-5">
                Find healthy snacks under ₹500.
              </div>

              <div className="mt-3 rounded-2xl bg-[#18181b] p-4 text-sm font-bold leading-5 text-white">
                I found 6 strong matches.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Products