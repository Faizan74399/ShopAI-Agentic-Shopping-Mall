from database import get_connection, create_tables

products = [
    {
        "id": 1,
        "name": "Organic Honey",
        "category": "Organic",
        "price": 349,
        "rating": 4.8,
        "reviews": 124,
        "emoji": "🍯",
        "description": "Pure organic honey with a naturally rich taste.",
        "organic": 1
    },
    {
        "id": 2,
        "name": "Premium Green Tea",
        "category": "Beverages",
        "price": 249,
        "rating": 4.7,
        "reviews": 98,
        "emoji": "🍵",
        "description": "Premium green tea leaves selected for a refreshing experience.",
        "organic": 0
    },
    {
        "id": 3,
        "name": "Almonds",
        "category": "Snacks",
        "price": 599,
        "rating": 4.9,
        "reviews": 186,
        "emoji": "🥜",
        "description": "Premium quality almonds packed with nutrition.",
        "organic": 0
    },
    {
        "id": 4,
        "name": "Oat Milk",
        "category": "Dairy",
        "price": 199,
        "rating": 4.6,
        "reviews": 76,
        "emoji": "🥛",
        "description": "Smooth plant-based oat milk for everyday use.",
        "organic": 0
    },
    {
        "id": 5,
        "name": "Brown Rice",
        "category": "Grains",
        "price": 179,
        "rating": 4.5,
        "reviews": 65,
        "emoji": "🌾",
        "description": "Healthy whole-grain brown rice for everyday meals.",
        "organic": 0
    },
    {
        "id": 6,
        "name": "Organic Green Seeds",
        "category": "Organic",
        "price": 299,
        "rating": 4.7,
        "reviews": 89,
        "emoji": "🌱",
        "description": "Nutritious organic seeds perfect for a healthy lifestyle.",
        "organic": 1
    },
    {
        "id": 7,
        "name": "Dark Chocolate",
        "category": "Snacks",
        "price": 199,
        "rating": 4.8,
        "reviews": 143,
        "emoji": "🍫",
        "description": "Rich dark chocolate made for chocolate lovers.",
        "organic": 0
    },
    {
        "id": 8,
        "name": "Premium Coffee",
        "category": "Beverages",
        "price": 449,
        "rating": 4.9,
        "reviews": 211,
        "emoji": "☕",
        "description": "Aromatic premium coffee with a deep and smooth flavour.",
        "organic": 0
    }
]

create_tables()

connection = get_connection()
cursor = connection.cursor()

for product in products:
    cursor.execute("""
        INSERT OR REPLACE INTO products
        (id, name, category, price, rating, reviews, emoji, description, organic)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        product["id"],
        product["name"],
        product["category"],
        product["price"],
        product["rating"],
        product["reviews"],
        product["emoji"],
        product["description"],
        product["organic"]
    ))

connection.commit()
connection.close()

print("Products inserted successfully!")