from typing import Optional
from langchain_core.tools import tool
from database import get_connection


@tool
def search_products(
    query: str = "",
    max_price: Optional[float] = None,
    min_rating: Optional[float] = None,
    organic_only: bool = False
):
    """Search products from the ShopAI database using name, category, price, rating and organic filters."""

    connection = get_connection()
    cursor = connection.cursor()

    sql = """
        SELECT id, name, category, price, rating, reviews, emoji, description, organic
        FROM products
        WHERE 1 = 1
    """

    parameters = []

    if query:
        sql += """
            AND (
                name LIKE ?
                OR category LIKE ?
                OR description LIKE ?
            )
        """
        search_value = f"%{query}%"
        parameters.extend([
            search_value,
            search_value,
            search_value
        ])

    if max_price is not None:
        sql += " AND price <= ?"
        parameters.append(max_price)

    if min_rating is not None:
        sql += " AND rating >= ?"
        parameters.append(min_rating)

    if organic_only:
        sql += " AND organic = 1"

    sql += " ORDER BY rating DESC, reviews DESC"

    cursor.execute(sql, parameters)
    products = cursor.fetchall()

    connection.close()

    return [dict(product) for product in products]
@tool
def get_product_details(product_id: int):
    """Get complete details of a specific product."""

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM products WHERE id = ?",
        (product_id,)
    )

    product = cursor.fetchone()

    connection.close()

    if product is None:
        return {"error": "Product not found"}

    return dict(product)


@tool
def get_reviews(product_id: int):
    """Get customer rating information for a specific product."""

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT id, name, rating, reviews
        FROM products
        WHERE id = ?
        """,
        (product_id,)
    )

    product = cursor.fetchone()

    connection.close()

    if product is None:
        return {"error": "Product not found"}

    return {
        "product_id": product["id"],
        "product_name": product["name"],
        "rating": product["rating"],
        "review_count": product["reviews"]
    }
@tool
def compare_products(product_id_1: int, product_id_2: int):
    """Compare two products using their database information."""

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM products WHERE id IN (?, ?)",
        (product_id_1, product_id_2)
    )

    products = cursor.fetchall()

    connection.close()

    if len(products) != 2:
        return {
            "error": "One or both products were not found."
        }

    product_data = [dict(product) for product in products]

    return {
        "product_1": product_data[0],
        "product_2": product_data[1]
    }
@tool
def recommend_products(
    max_price: Optional[float] = None,
    min_rating: Optional[float] = None,
    category: str = "",
    organic_only: bool = False
):
    """Recommend the best products based on budget, rating, category and organic preferences."""

    connection = get_connection()
    cursor = connection.cursor()

    sql = """
        SELECT id, name, category, price, rating, reviews, emoji, description, organic
        FROM products
        WHERE 1 = 1
    """

    parameters = []

    if max_price is not None:
        sql += " AND price <= ?"
        parameters.append(max_price)

    if min_rating is not None:
        sql += " AND rating >= ?"
        parameters.append(min_rating)

    if category:
        sql += " AND category LIKE ?"
        parameters.append(f"%{category}%")

    if organic_only:
        sql += " AND organic = 1"

    sql += """
        ORDER BY rating DESC, reviews DESC, price ASC
        LIMIT 5
    """

    cursor.execute(sql, parameters)

    products = cursor.fetchall()

    connection.close()

    return [dict(product) for product in products]
@tool
def cart_action(
    action: str,
    product_id: int,
    quantity: int = 1
):
    """Prepare a cart action for the frontend such as adding or removing a product."""

    if action not in ["add", "remove"]:
        return {
            "error": "Invalid cart action. Use add or remove."
        }

    if quantity < 1:
        return {
            "error": "Quantity must be at least 1."
        }

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT id, name, category, price, rating, reviews, emoji, description, organic
        FROM products
        WHERE id = ?
        """,
        (product_id,)
    )

    product = cursor.fetchone()

    connection.close()

    if product is None:
        return {
            "error": "Product not found."
        }

    return {
        "action": action,
        "product": dict(product),
        "quantity": quantity
    }