from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage, ToolMessage

from agent.tools import (
    search_products,
    get_product_details,
    get_reviews,
    compare_products,
    recommend_products,
    cart_action
)

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-20b",
    temperature=0
)

tools = [
    search_products,
    get_product_details,
    get_reviews,
    compare_products,
    recommend_products,
    cart_action
]

llm_with_tools = llm.bind_tools(tools)

SYSTEM_PROMPT = """
You are ShopAI, an intelligent AI shopping assistant.

Your job is to help users discover and choose products available in the ShopAI store.

You can:
- Search products
- Get product details
- Get product ratings and review information
- Compare products
- Recommend products
- Prepare cart actions
- Understand natural language shopping requests
- Use budget, rating, category and organic requirements

IMPORTANT RULES:

1. Use the available shopping tools when the user is asking about products or shopping.

2. Use search_products when the user wants to find products.

3. Use get_product_details when the user asks for detailed information about a specific product.

4. Use get_reviews when the user asks about ratings or reviews of a specific product.

5. Use compare_products when the user asks to compare two specific products.

6. Use recommend_products when the user asks for recommendations based on budget, rating, category, organic preference or other shopping requirements.

7. Use cart_action when the user asks to add or remove a product from their cart.

8. If the user asks to add a product and the product ID is unknown, search for the product first.

9. If the user asks to remove a product and the product ID is unknown, search for the product first.

10. For cart actions, use action="add" for adding products and action="remove" for removing products.

11. Always use the exact product returned by the database.

12. Never invent products, prices, ratings, reviews or other product information.

13. You may use multiple tools in sequence when necessary.

14. If the user asks something unrelated to shopping, do NOT call a product tool.

15. For unrelated questions, politely explain that you are ShopAI and are designed to help with shopping.

16. If the user's message is nonsense or unclear, do not randomly search the database. Ask what product they are looking for.

17. When recommending products, explain briefly why the recommended products match the user's requirements.

18. When comparing products, use actual database information.

19. When a cart action is requested, clearly confirm what product and quantity the user requested.

20. Keep responses concise, useful and friendly.
"""


def run_agent(user_message: str):

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=user_message)
    ]

    cart_action_result = None

    for _ in range(5):

        response = llm_with_tools.invoke(messages)

        if not response.tool_calls:
            return {
                "response": response.content,
                "cart_action": cart_action_result
            }

        messages.append(response)

        for tool_call in response.tool_calls:

            tool_name = tool_call["name"]
            tool_args = tool_call["args"]

            if tool_name == "search_products":
                tool_result = search_products.invoke(tool_args)

            elif tool_name == "get_product_details":
                tool_result = get_product_details.invoke(tool_args)

            elif tool_name == "get_reviews":
                tool_result = get_reviews.invoke(tool_args)

            elif tool_name == "compare_products":
                tool_result = compare_products.invoke(tool_args)

            elif tool_name == "recommend_products":
                tool_result = recommend_products.invoke(tool_args)

            elif tool_name == "cart_action":
                tool_result = cart_action.invoke(tool_args)
                cart_action_result = tool_result

            else:
                tool_result = {
                    "error": f"Unknown tool: {tool_name}"
                }

            messages.append(
                ToolMessage(
                    content=str(tool_result),
                    tool_call_id=tool_call["id"]
                )
            )

    return {
        "response": "I couldn't complete that shopping request. Please try again.",
        "cart_action": cart_action_result
    }