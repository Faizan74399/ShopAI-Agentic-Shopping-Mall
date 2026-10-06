import ImageSearch from '../components/ImageSearch'
import { Link } from 'react-router-dom'
import products from '../data/products'
import AIChat from '../components/AIChat'

function Home() {
  const featuredProducts = products.slice(0, 4)

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#18181b]">

      <section className="mx-auto max-w-[1400px] px-6 pb-20 pt-16 lg:px-10 lg:pt-24">
        <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_0.65fr]">

          <div>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-12 bg-[#18181b]" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#77777f]">
                Intelligent Commerce
              </span>
            </div>

            <h1 className="max-w-[850px] text-[clamp(4rem,8vw,8.5rem)] font-black leading-[0.84] tracking-[-0.075em]">
              Shopping,
              <br />
              <span className="text-[#7771d9]">but smarter.</span>
            </h1>
          </div>

          <div className="max-w-[390px] pb-3">
            <p className="text-lg leading-8 text-[#64656c]">
              ShopAI understands what you want, finds the right products,
              compares your options and helps you decide.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#18181b] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#303035]"
            >
              Explore marketplace
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[1.55fr_0.45fr]">

          <div className="relative min-h-[430px] overflow-hidden rounded-[32px] bg-[#dcd7ff] p-8 sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#f5e6a8] opacity-70" />
            <div className="absolute -bottom-24 right-20 h-72 w-72 rounded-full bg-[#c7c0ff] opacity-80" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5e5a91]">
                  AI Shopping Assistant
                </span>

                <span className="flex items-center gap-2 text-xs font-bold text-[#5e5a91]">
                  <span className="h-2 w-2 rounded-full bg-[#5e5a91]" />
                  Ready
                </span>
              </div>

              <div className="max-w-[700px]">
                <p className="text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">
                  Tell us what
                  <br />
                  you are looking for.
                </p>

                <div className="mt-8 flex max-w-[620px] items-center gap-3 rounded-2xl border border-white/70 bg-white/75 p-2 shadow-sm backdrop-blur">
                  <div className="flex-1 px-4 py-3 text-sm text-[#85858b]">
                    Try “healthy snacks under ₹500”
                  </div>

                  <Link
                    to="/products"
                    className="rounded-xl bg-[#18181b] px-5 py-3 text-sm font-bold text-white"
                  >
                    Search
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-[430px] rounded-[32px] bg-[#ffd9c7] p-8 sm:p-10">
            <div className="flex h-full flex-col justify-between">
              <div className="flex justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d6657]">
                  Why ShopAI
                </span>

                <span className="text-sm font-bold text-[#8d6657]">
                  01
                </span>
              </div>

              <div>
                <div className="mb-6 text-6xl">✦</div>

                <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.05em]">
                  Less
                  <br />
                  scrolling.
                  <br />
                  Better
                  <br />
                  choices.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AIChat />


      <ImageSearch />

      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#77777f]">
              Explore
            </p>

            <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-6xl">
              Shop by mood.
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden text-sm font-bold underline underline-offset-4 sm:block"
          >
            View all products →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/products"
            className="group min-h-[260px] rounded-[28px] bg-[#d8f1e5] p-7 transition hover:-translate-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#557563]">
              01
            </span>

            <div className="mt-24">
              <h3 className="text-3xl font-black tracking-[-0.05em]">
                Healthy
              </h3>
              <p className="mt-2 text-sm text-[#61756a]">
                Better choices for everyday life.
              </p>
            </div>
          </Link>

          <Link
            to="/products"
            className="group min-h-[260px] rounded-[28px] bg-[#d8e8ff] p-7 transition hover:-translate-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#59708f]">
              02
            </span>

            <div className="mt-24">
              <h3 className="text-3xl font-black tracking-[-0.05em]">
                Refresh
              </h3>
              <p className="mt-2 text-sm text-[#65758c]">
                Drinks, coffee and more.
              </p>
            </div>
          </Link>

          <Link
            to="/products"
            className="group min-h-[260px] rounded-[28px] bg-[#f5e6a8] p-7 transition hover:-translate-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#81764b]">
              03
            </span>

            <div className="mt-24">
              <h3 className="text-3xl font-black tracking-[-0.05em]">
                Organic
              </h3>
              <p className="mt-2 text-sm text-[#81764b]">
                Naturally better products.
              </p>
            </div>
          </Link>

          <Link
            to="/products"
            className="group min-h-[260px] rounded-[28px] bg-[#ffd9c7] p-7 transition hover:-translate-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8d6657]">
              04
            </span>

            <div className="mt-24">
              <h3 className="text-3xl font-black tracking-[-0.05em]">
                Treats
              </h3>
              <p className="mt-2 text-sm text-[#8d6657]">
                Because sometimes you deserve it.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-10">
        <div className="rounded-[36px] bg-[#18181b] p-8 text-white sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#aaa9b4]">
                Featured picks
              </p>

              <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">
                Things worth
                <br />
                putting in
                <br />
                your cart.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featuredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group rounded-[24px] bg-[#292a30] p-5 transition hover:-translate-y-1 hover:bg-[#32333a]"
                >
                  <div
                    className={`flex h-32 items-center justify-center rounded-[20px] ${
                      index === 0
                        ? 'bg-[#dcd7ff]'
                        : index === 1
                        ? 'bg-[#ffd9c7]'
                        : index === 2
                        ? 'bg-[#d8f1e5]'
                        : 'bg-[#d8e8ff]'
                    }`}
                  >
                    <span className="text-5xl">
                      {product.emoji}
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-white">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#a8a8b0]">
                        {product.category}
                      </p>
                    </div>

                    <span className="font-bold text-white">
                      ₹{product.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-10">
        <div className="grid overflow-hidden rounded-[36px] bg-[#d8e8ff] lg:grid-cols-[1fr_0.8fr]">
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#59708f]">
              Coming next
            </p>

            <h2 className="mt-5 max-w-[650px] text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">
              A shopping
              <br />
              assistant that
              <br />
              remembers.
            </h2>

            <p className="mt-7 max-w-[520px] text-base leading-7 text-[#65758c]">
              ShopAI is built to understand your preferences, compare
              products and make every shopping session more personal.
            </p>
          </div>

          <div className="relative min-h-[330px] bg-[#c8dcfa]">
            <div className="absolute left-1/2 top-1/2 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f7f5ef] shadow-xl">
              <div className="text-center">
                <div className="text-4xl font-black tracking-[-0.05em]">
                  AI
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#77777f]">
                  Powered shopping
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#deddd8] bg-[#f7f5ef]">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-5 px-6 py-10 sm:flex-row sm:items-center lg:px-10">
          <div>
            <div className="text-xl font-black tracking-[-0.04em]">
              ShopAI
            </div>
            <p className="mt-1 text-sm text-[#77777f]">
              Intelligent shopping, redesigned.
            </p>
          </div>

          <Link
            to="/products"
            className="text-sm font-bold text-[#18181b] underline underline-offset-4"
          >
            Start shopping →
          </Link>
        </div>
      </footer>

    </main>
  )
}

export default Home