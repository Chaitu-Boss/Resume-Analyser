import json
import re
from agno.run.response import RunEvent,RunResponse
def parse_mixed_response(response,stream=False):
    """
    Processes Agno response, extracting JSON and separating additional text.

    Args:
        response: The response object from `agent.run()`
        stream (bool): Whether to process the response as a stream

    Returns:
        tuple: (parsed_json, additional_text)
    """
    json_match = re.search(r"```json\s*(\{.*?\}|\[.*?\])\s*```", response, re.DOTALL)

    json_data = None
    if json_match:
        json_str = json_match.group(1)
        try:
            json_data = json.loads(json_str)
        except json.JSONDecodeError:
            pass
        remaining_text = response.replace(json_match.group(0), "").strip()
    else:
        remaining_text = response.strip()

    return json_data, remaining_text


