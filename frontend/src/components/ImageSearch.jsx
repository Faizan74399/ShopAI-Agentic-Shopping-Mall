import { useState } from 'react'

function ImageSearch() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]

    if (!selectedFile) return

    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setResult(null)
    setError('')
  }

  const handleSearch = async () => {
    if (!file) {
      setError('Please select an image first.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/search-by-image',
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Image search failed.')
      }

      setResult(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-[32px] bg-[#eeeaff] p-8 md:p-12">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6d5bd0]">
            AI Vision Search
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-[#24232d] md:text-5xl">
            Find products with a picture.
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#686675]">
            Upload a product image and let ShopAI identify it and find
            matching products from our store.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#c9c2ef] bg-[#faf9ff] p-6 text-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Selected product"
                  className="max-h-56 rounded-2xl object-contain"
                />
              ) : (
                <>
                  <div className="text-5xl">📷</div>
                  <p className="mt-4 font-semibold text-[#292833]">
                    Upload a product image
                  </p>
                  <p className="mt-2 text-sm text-[#858391]">
                    JPG, PNG or WEBP
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="mt-5 w-full rounded-2xl bg-[#6d5bd0] px-6 py-4 font-semibold text-white transition hover:bg-[#5c4bc2] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Analyzing image...' : 'Search with AI'}
            </button>

            {error && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            {!result && !loading && (
              <div className="flex min-h-64 items-center justify-center text-center">
                <div>
                  <div className="text-5xl">✨</div>
                  <p className="mt-4 font-semibold text-[#292833]">
                    AI results will appear here
                  </p>
                  <p className="mt-2 text-sm text-[#858391]">
                    Upload an image to discover matching products.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex min-h-64 items-center justify-center text-center">
                <div>
                  <div className="text-4xl">🔍</div>
                  <p className="mt-4 font-semibold text-[#292833]">
                    ShopAI is analyzing your image...
                  </p>
                </div>
              </div>
            )}

            {result && (
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6d5bd0]">
                  AI Analysis
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#292833]">
                  {result.analysis.product || 'Product detected'}
                </h3>

                <p className="mt-2 text-sm text-[#777584]">
                  Category: {result.analysis.category || 'Unknown'}
                </p>

                {result.analysis.keywords?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.analysis.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-[#eeeaff] px-3 py-1 text-xs font-medium text-[#5f50bd]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <h4 className="text-lg font-bold text-[#292833]">
                    Matching Products
                  </h4>

                  {result.products.length === 0 ? (
                    <p className="mt-3 text-sm text-[#777584]">
                      No matching products found.
                    </p>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {result.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between rounded-2xl bg-[#f8f7fc] p-4"
                        >
                          <div>
                            <p className="font-semibold text-[#292833]">
                              {product.emoji} {product.name}
                            </p>
                            <p className="mt-1 text-sm text-[#777584]">
                              ⭐ {product.rating} · {product.reviews} reviews
                            </p>
                          </div>

                          <p className="font-bold text-[#292833]">
                            ₹{product.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageSearch