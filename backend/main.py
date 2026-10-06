import json
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import get_connection
from agent.graph import run_agent
from agent.tools import search_products
from services.vision import analyze_product_image

app = FastAPI(title="ShopAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {
        "message": "ShopAI backend is running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.get("/products")
def get_products():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()

    connection.close()

    return [dict(product) for product in products]

@app.get("/products/{product_id}")
def get_product(product_id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM products WHERE id = ?",
        (product_id,)
    )

    product = cursor.fetchone()

    connection.close()

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return dict(product)

@app.post("/ask")
def ask_agent(request: AskRequest):
    try:
        result = run_agent(request.message)

        return {
            "response": result["response"],
            "cart_action": result["cart_action"]
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

@app.post("/search-by-image")
async def search_by_image(file: UploadFile = File(...)):
    allowed_types = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Please upload a JPG, PNG or WEBP image."
        )

    image_bytes = await file.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded image is empty."
        )

    try:
        analysis_text = analyze_product_image(
            image_bytes,
            file.content_type
        )

        analysis = json.loads(analysis_text)

        search_terms = []

        if analysis.get("product"):
            search_terms.append(analysis["product"])

        if analysis.get("category"):
            search_terms.append(analysis["category"])

        search_terms.extend(analysis.get("keywords", []))

        products = []
        seen_ids = set()

        for term in search_terms:
            results = search_products.invoke({
                "query": term
            })

            for product in results:
                if product["id"] not in seen_ids:
                    products.append(product)
                    seen_ids.add(product["id"])

        return {
            "success": True,
            "analysis": analysis,
            "products": products
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Image search failed: {str(error)}"
        )