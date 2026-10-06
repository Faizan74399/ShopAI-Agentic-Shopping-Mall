\# ShopAI — Agentic AI Shopping Mall



ShopAI is an AI-powered shopping platform that combines a modern React frontend with an intelligent FastAPI backend, SQLite database, LangChain-based AI tools, Groq LLMs and multimodal AI vision.



The system allows users to search for products using natural language, get AI-powered recommendations, compare products, analyze product images and even add or remove products from the cart using natural language.



\## ✨ Features



\- 🤖 AI Shopping Assistant

\- 🔎 Natural-language product search

\- 💡 AI-powered product recommendations

\- ⚖️ AI product comparison

\- 🛒 AI-controlled cart actions

\- 👁️ AI image-based product search

\- ⭐ Product ratings and review information

\- 💰 Budget-based product filtering

\- 🌱 Organic product filtering

\- 📦 Product details and categories

\- 🛍️ Full shopping cart

\- 💳 Checkout flow

\- 📋 Order history

\- 💾 SQLite product database

\- 🎨 Responsive React + Tailwind CSS interface



\## 🧠 AI Capabilities



ShopAI uses an AI agent that can understand the user's shopping intent and decide which tool should be used.



For example:



> "Recommend me organic products under ₹400"



The agent can identify the requirements and use the recommendation tool to retrieve matching products from the database.



Another example:



> "Add 2 Organic Honey to my cart"



The AI identifies the product and quantity, executes the cart tool and returns a structured cart action to the React frontend.



\## 👁️ AI Vision Search



Users can upload a product image and ShopAI analyzes it using a multimodal Groq vision model.



The workflow is:



Image Upload → AI Vision Analysis → Product / Category / Keywords → Database Search → Matching Products



This allows users to discover products using an image instead of typing a product name.



\## 🏗️ Architecture



```text

&#x20;                        USER

&#x20;                          │

&#x20;                          ▼

&#x20;                 React Frontend

&#x20;                          │

&#x20;            ┌─────────────┴─────────────┐

&#x20;            │                           │

&#x20;         AI Chat                  Image Search

&#x20;            │                           │

&#x20;            └─────────────┬─────────────┘

&#x20;                          ▼

&#x20;                     FastAPI

&#x20;                     main.py

&#x20;                          │

&#x20;             ┌────────────┴────────────┐

&#x20;             │                         │

&#x20;             ▼                         ▼

&#x20;         AI Agent                Vision Service

&#x20;         graph.py                 vision.py

&#x20;             │

&#x20;             ▼

&#x20;         AI Tools

&#x20;         tools.py

&#x20;             │

&#x20;             ▼

&#x20;          SQLite

&#x20;        shopai.db

&#x20;             │

&#x20;             ▼

&#x20;         Products

