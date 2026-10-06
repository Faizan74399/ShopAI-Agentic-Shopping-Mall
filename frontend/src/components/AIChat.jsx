import { useState } from 'react'
import { useCart } from '../context/CartContext'

function AIChat() {
  const { addToCart, removeFromCart } = useCart()

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hey! I'm ShopAI. Tell me what you're looking for — budget, category, rating, organic products, anything."
    }
  ])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim() || loading) return

    const userMessage = message.trim()

    setMessages((current) => [
      ...current,
      {
        role: 'user',
        content: userMessage
      }
    ])

    setMessage('')
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      if (data.cart_action) {
        const action = data.cart_action

        if (action.action === 'add') {
          addToCart(action.product, action.quantity)
        }

        if (action.action === 'remove') {
          removeFromCart(action.product.id)
        }
      }

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: data.response
        }
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            'Sorry, I could not connect to ShopAI right now. Please make sure the backend is running.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="overflow-hidden rounded-[32px] border border-violet-100 bg-white shadow-[0_24px_80px_rgba(91,72,145,0.12)]">
        <div className="bg-gradient-to-br from-violet-50 via-white to-orange-50 px-7 py-8">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-violet-500">
            ShopAI Assistant
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Shop smarter with AI.
          </h2>

          <p className="mt-3 max-w-2xl text-gray-500">
            Ask naturally. I'll search the store and help you find products
            based on your needs.
          </p>
        </div>

        <div className="h-[420px] space-y-4 overflow-y-auto bg-[#fcfbff] p-6">
          {messages.map((item, index) => (
            <div
              key={index}
              className={`flex ${
                item.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-5 py-3.5 text-sm leading-6 ${
                  item.role === 'user'
                    ? 'rounded-br-md bg-violet-600 text-white'
                    : 'rounded-bl-md border border-violet-100 bg-white text-gray-700 shadow-sm'
                }`}
              >
                {item.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-violet-100 bg-white px-5 py-3.5 text-sm text-gray-500 shadow-sm">
                ShopAI is thinking...
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 bg-white p-5">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Try: Find organic products under ₹400"
              className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm text-gray-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-2xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? '...' : 'Ask AI'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIChat