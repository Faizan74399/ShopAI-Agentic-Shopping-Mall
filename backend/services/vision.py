import base64
import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def analyze_product_image(image_bytes: bytes, content_type: str):
    encoded_image = base64.b64encode(image_bytes).decode("utf-8")

    response = client.chat.completions.create(
        model="qwen/qwen3.8-27b",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": """
Analyze this image for an e-commerce shopping assistant.

Identify:
1. What type of product is visible?
2. Product name or likely product name if readable.
3. Category.
4. Important visual characteristics.
5. Useful search keywords.

Do not invent an exact brand or product name if it cannot be determined.

Return only JSON in this format:
{
  "product": "",
  "category": "",
  "keywords": [],
  "description": ""
}
"""
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{content_type};base64,{encoded_image}"
                        }
                    }
                ]
            }
        ],
        temperature=0.2,
        max_completion_tokens=500,
        response_format={"type": "json_object"}
    )

    return response.choices[0].message.content