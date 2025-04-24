import requests
import json
import os 
from dotenv import load_dotenv

load_dotenv()
def get_jobs(query):
    url=f"https://serpapi.com/search.json?engine=google_jobs&q={query}&hl=en&api_key={os.getenv('SERPAPI_KEY')}"
    response = requests.get(url)
    response.raise_for_status()
    jobs = response.json()
    if isinstance(jobs, str):
        jobs = json.loads(jobs)
    if isinstance(jobs['jobs_results'], str):
        avail_jobs = json.loads(jobs['jobs_results'])
    else:
        avail_jobs = jobs['jobs_results']
    extracted=[]
    for job in avail_jobs:
        text={}
        text['title']=job['title']
        text['company']=job['company_name']
        text['location']=job['location']
        text['description']=job['description']
        text["apply_options"]=job['apply_options']
        extracted.append(text)
    return extracted