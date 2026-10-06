from typing import TypedDict, List, Dict, Any


class AgentState(TypedDict):
    user_message: str
    messages: List[Dict[str, Any]]
    response: str