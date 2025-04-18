import requests
import json
import os 
from dotenv import load_dotenv

load_dotenv()
def get_jobs(query):
    url=f"https://serpapi.com/search.json?engine=google_jobs&q={query}&hl=en&api_key={os.getenv('SERPAPI_KEY')}"
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    return json.dumps(data)
